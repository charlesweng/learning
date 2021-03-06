/**
 * Problem3.java
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


public class Problem3 {

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
            // Total the list of values associated with the email domain.
            long count = 0;
            for (IntWritable val : values) {
                count += val.get();
            }

            context.write(key, new LongWritable(count));
        }
    }

    /* 
     * Put your mapper and reducer classes here. 
     * Remember that they should be static nested classes. 
     */

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "problem 3");

        // Specifies the name of the outer class.
        job.setJarByClass(Problem3.class);


        /* CHANGE THE CLASS NAMES AS NEEDED IN THE METHOD CALLS BELOW */

        // Specifies the names of the mapper and reducer classes.
        job.setMapperClass(MyMapper.class);
        job.setReducerClass(MyReducer.class);

        // Sets the type for the keys output by the mapper and reducer.
        job.setOutputKeyClass(Text.class);

        // Sets the type for the values output by the mapper and reducer,
        // although we can change the mapper's type below.
        job.setOutputValueClass(LongWritable.class);

        // Sets the type for the keys output by the mapper.
        // Not needed here because both the mapper and reducer's output keys 
        // have the same type, but you can uncomment it as needed
        // and pass in the appropriate type.
        //   job.setMapOutputKeyClass(Text.class);

        // Sets the type for the values output by the mapper.
        // This is needed because it is different than the type specified
        // by job.setOutputValueClass() above. 
        // If the mapper and reducer output values of the same type, 
        // you can comment out or remove this line.
        job.setMapOutputValueClass(IntWritable.class);


        job.setInputFormatClass(TextInputFormat.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        job.waitForCompletion(true);
    }
}
