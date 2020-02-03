/**
 * Problem5.java
 */

import java.io.IOException;
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


public class Problem5 {

    public static class MyMapper extends Mapper<Object, Text, Text, Text> {
        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException
        {
            try {

                // read line
                String line = value.toString();
                // split row by comma
                String[] user_row = line.split(";");
                // grab user's id
                String id = user_row[0].split(",")[0];
                // grab the user's email
                int friends = (user_row[1].split(",")).length;;
                // process the row and output domain as key and 1
                context.write(new Text("aggregate_key"), new Text(id + "\t" + friends));
            } catch (IndexOutOfBoundsException indexError) {
                // do nothing, skip wrong if
                // email doesn't have an @ symbol or parsing fails
            }
        }
    }

    public static class MyReducer extends
            Reducer<Text, Text, Text, LongWritable>
    {
        public void reduce(Text key, Iterable<Text> values, Context context)
                throws IOException, InterruptedException
        {
            // Total the list of values associated with the word.
            String id = "";
            long max_friends = Long.MIN_VALUE;
            for (Text t : values) {
                try {
                    String[] line = (t.toString()).split("\t");
                    long current_friends = Long.parseLong(line[1]);
                    String current_id = line[0];
                    if (current_friends >= max_friends) {
                        max_friends = current_friends;
                        id = current_id;
                    }
                } catch (Exception e) {
                    // skip if line failed to parse
                    System.err.println("Failed to parse line: " + t.toString());
                    continue;
                }
            }

            context.write(new Text(id), new LongWritable(max_friends));
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "problem 5");
        job.setJarByClass(Problem5.class);

        /* CHANGE THE CLASS NAMES AS NEEDED IN THE METHOD CALLS BELOW */
        // See Problem3.java for comments describing the calls.

        job.setMapperClass(MyMapper.class);
        job.setReducerClass(MyReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(LongWritable.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(Text.class);

        job.setInputFormatClass(TextInputFormat.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        job.waitForCompletion(true);
    }
}
