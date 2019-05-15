/**
 * Problem4.java
 */

import java.io.IOException;
import java.text.ParseException;
import java.time.*;
import java.util.*;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;

/* 
 * interfaces and classes for Hadoop data types that you may 
 * need for some or all of the problems from PS 4
 */
import org.apache.hadoop.io.ArrayWritable;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.Writable;

import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;

import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;


public class Problem4 {

    public static class MyMapper extends Mapper<Object, Text, Text, IntWritable> {
        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException
        {
            try {

                // read line
                String line = value.toString();
                // split row by comma
                String[] user_row = line.split(",");
                // grab the user's email
                String user_email = user_row[4];
                // parse the email domain
                String email = user_email.split("@")[1];
                email = email.split(";")[0];
                // process the row and output domain as key and 1
                context.write(new Text(email), new IntWritable(1));
            } catch (IndexOutOfBoundsException indexError) {
                // do nothing, skip wrong if
                // email doesn't have an @ symbol or parsing fails
            }
        }
    }

    public static class MyReducer extends
            Reducer<Text, IntWritable, Text, LongWritable>
    {
        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException
        {
            // Total the list of values associated with the word.
            long count = 0;
            for (IntWritable val : values) {
                count += val.get();
            }

            context.write(key, new LongWritable(count));
        }
    }

    public static class MyMapper2 extends Mapper<Object, Text, Text, Text> {
        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException
        {
            try {
                // read line
                String line = value.toString();
                // process the all rows as 1 key
                context.write(new Text("aggregate_key"), new Text(line));
            } catch (IndexOutOfBoundsException indexError) {
                // do nothing, skip wrong if
                // row is invalid
            }
        }
    }

    public static class MyReducer2 extends
            Reducer<Text, Text, Text, LongWritable>
    {
        public void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException
        {
            String max_domain = "";
            long max_count = Long.MIN_VALUE;
            for (Text t : values) {
                try {
                    String[] line = (t.toString()).split("\t");
                    long current_count = Long.parseLong(line[1]);
                    String current_domain = line[0];
                    if (current_count > max_count) {
                        max_count = current_count;
                        max_domain = current_domain;
                    }
                } catch (Exception e) {
                    // skip if line failed to parse
                    System.err.println("Failed to parse line: " + t.toString());
                    continue;
                }
            }
            context.write(new Text(max_domain), new LongWritable(max_count));
        }
    }

    public static void main(String[] args) throws Exception {
        /*
	 * First job in a chain of two jobs
	 */
        Configuration conf = new Configuration();
        Job job1 = Job.getInstance(conf, "problem 4-1");
        job1.setJarByClass(Problem4.class);

        /* CHANGE THE CLASS NAMES AS NEEDED IN THE METHOD CALLS BELOW */
        // See Problem3.java for comments describing the calls.

        job1.setMapperClass(MyMapper.class);
        job1.setReducerClass(MyReducer.class);

        job1.setOutputKeyClass(Text.class);
        job1.setOutputValueClass(LongWritable.class);
        //   job1.setMapOutputKeyClass(Text.class);
        job1.setMapOutputValueClass(IntWritable.class);

        job1.setInputFormatClass(TextInputFormat.class);
        FileInputFormat.addInputPath(job1, new Path(args[0]));
        FileOutputFormat.setOutputPath(job1, new Path(args[1]));

        job1.waitForCompletion(true);


        /*
	 * Second job in a chain of two jobs
	 */
        Job job2 = Job.getInstance(conf, "problem 4-2");
        job2.setJarByClass(Problem4.class);

        /* CHANGE THE CLASS NAMES AS NEEDED IN THE METHOD CALLS BELOW */
        // See Problem3.java for comments describing the calls.

        job2.setMapperClass(MyMapper2.class);
        job2.setReducerClass(MyReducer2.class);

        job2.setOutputKeyClass(Text.class);
        job2.setOutputValueClass(LongWritable.class);
        job2.setMapOutputKeyClass(Text.class);
        job2.setMapOutputValueClass(Text.class);

        job2.setInputFormatClass(TextInputFormat.class);
        FileInputFormat.addInputPath(job2, new Path(args[1]));
        FileOutputFormat.setOutputPath(job2, new Path(args[2]));

        job2.waitForCompletion(true);
    }
}
