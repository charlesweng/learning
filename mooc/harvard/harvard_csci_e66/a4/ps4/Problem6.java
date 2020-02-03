/**
 * Problem6.java
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


public class Problem6 {
    /*
     * One possible type for the values that the mapper should output
     */
    public static class IntArrayWritable extends ArrayWritable {
        public IntArrayWritable() {
            super(IntWritable.class);
        }
        
        public IntArrayWritable(IntWritable[] values) {
            super(IntWritable.class, values);
        }

        // Had to change return type to Integer[] to use Arrays.asList later
        public Integer[] toIntArray() {
            Writable[] w = this.get();
            Integer[] a = new Integer[w.length];
            for (int i = 0; i < a.length; ++i) {
                a[i] = Integer.parseInt(w[i].toString());
            }
            return a;
        }
    }

    public static class MyMapper extends Mapper<Object, Text, Text, IntArrayWritable> {
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
                // grab the user's friends
                if (user_row.length == 1) {
                    return;
                }
                String[] friends = user_row[1].split(",");
                IntWritable[] iw = new IntWritable[friends.length];
                for (int i = 0; i < friends.length; i++) {
                    try {
                        // convert String to IntWritable
                        iw[i] = new IntWritable(Integer.parseInt(friends[i]));
                    } catch (Exception e) {
                        // skip if can't parse integer
                        System.err.println("Error parsing: " + friends[i]);
                    }
                }
                // Create IntWritable array
                IntArrayWritable iaw = new IntArrayWritable(iw);
                // write all combinations of two user id's
                for (String friend : friends) {
                    // order by value for id's between two friends
                    String txt;
                    try {
                        if (Integer.parseInt(id) < Integer.parseInt(friend)) {
                            txt = id + "," + friend;
                        } else {
                            txt = friend + "," + id;
                        }
                    } catch (Exception e) {
                        // failing to parse skip
                        System.err.println("Failed to parse numbers: " + id + ", " + friend);
                        continue;
                    }
                    context.write(new Text(txt), iaw);
                }
            } catch (IndexOutOfBoundsException indexError) {
                // do nothing, skip wrong if
                // email doesn't have an @ symbol or parsing fails
                System.err.println("Index out of bounds error.");
            }
        }
    }

    public static class MyReducer extends
            Reducer<Text, IntArrayWritable, Text, Text>
    {
        public void reduce(Text key, Iterable<IntArrayWritable> values, Context context)
                throws IOException, InterruptedException
        {
            // No mutual friends if there is only one instance of values
            if (values instanceof Collection && ((Collection<?>) values).size() == 1) {
                context.write(key, new Text(""));
                return;
            }

            // Gather all the friends between two people with no duplicates
            boolean first = true;
            Set<Integer> commonFriends = new HashSet();
            for (IntArrayWritable iaw : values) {
                if (first) {
                    commonFriends = new HashSet<Integer>(Arrays.asList(iaw.toIntArray()));
                    continue;
                }
                Set<Integer> friendsOfAnotherPerson = new HashSet<Integer>(Arrays.asList(iaw.toIntArray()));
                commonFriends.retainAll(friendsOfAnotherPerson);
            }

            // When intersections yields length 0
            if (commonFriends.size() == 0) {
                context.write(key, new Text(""));
                return;
            }

            // Combine commonFriendsList into a string
            List<Integer> commonFriendsList = new ArrayList<Integer>(commonFriends);
            String mutualFriends = "" + commonFriendsList.get(0);
            for (int i = 1; i < commonFriendsList.size(); i++) {
                mutualFriends += "," + commonFriendsList.get(i);
            }

            context.write(key, new Text(mutualFriends));
        }
    }

    /* 
     * Put your mapper and reducer classes here. 
     * Remember that they should be static nested classes. 
     */

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "problem 6");
        job.setJarByClass(Problem6.class);


        /* CHANGE THE CLASS NAMES AS NEEDED IN THE METHOD CALLS BELOW */
        // See Problem3.java for comments describing the calls.

        job.setMapperClass(MyMapper.class);
        job.setReducerClass(MyReducer.class);

        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntArrayWritable.class);

        job.setInputFormatClass(TextInputFormat.class);
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        job.waitForCompletion(true);
    }
}
