package com.example.charleswengscoring;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.content.DialogInterface;
//import android.content.Intent;
//import android.content.res.Configuration;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.ActionBarActivity;
//import android.util.Log;
import android.view.View;
import android.widget.DatePicker;
//import android.widget.Toast;
//import android.widget.Toast;

public class MainActivity extends ActionBarActivity implements ChangeText {
	
//	FragmentManager manager;
	String formattedDate;
	DatePickerDialog dp;
	TeamDialog td;
	Calendar myCalendar;
	boolean changeDate = false;
	String team1;
	String team2;
	String score1;
	String score2;
	
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        changeDate = false;
        //Initialize my starting fragment values
        	formattedDate = getString(R.string.date);//"Date";//(String) findViewById(R.string.date).toString();
        	team1 = getString(R.string.team_1);//"Team 1";//(String) findViewById(R.string.team_1).toString();
        	team2 = getString(R.string.team_2);//"Team 2";//(String) findViewById(R.string.team_2).toString();
        	score1 = getString(R.string.zero);//"0";//(String) findViewById(R.string.zero).toString();
        	score2 = getString(R.string.zero);//"0";//(String) findViewById(R.string.zero).toString();
        //End of my Initialization
       
        
        //My Scoring
        //End of My Scoring
        
       
    
    }

    //used for saving information when changing between landscape/portrait
    @Override
    protected void onSaveInstanceState(Bundle outState) {
    	super.onSaveInstanceState(outState);
//    	Toast.makeText(this, "I'm Out", Toast.LENGTH_SHORT).show();
//    	if (formattedDate.length()!=0)
//    	Toast.makeText(this, "Bad Date", Toast.LENGTH_SHORT).show();
    	outState.putString("myDate", formattedDate);
    	outState.putString("team1",team1);
    	outState.putString("team2", team2);
    	outState.putString("score1", score1);
    	outState.putString("score2", score2);
    	
    }
    
    @SuppressLint("ShowToast")
	protected void onRestoreInstanceState(Bundle savedInstanceState) {
    	super.onRestoreInstanceState(savedInstanceState);
    	if (savedInstanceState == null)
    	{
//    		formattedDate = "Date";
//    		Toast.makeText(this, "Instance Not Restored", Toast.LENGTH_SHORT).show();
//    		Log.d("debug", "Instance not restored");
    	}
    	else
    	{
//    		Log.d("debug", "Instance restored");
//    		Toast.makeText(this, "Instance Restored", Toast.LENGTH_SHORT).show();
    		formattedDate = savedInstanceState.get("myDate").toString();
    		team1 = savedInstanceState.getString("team1").toString();
    		team2 = savedInstanceState.getString("team2").toString();
    		score1 = savedInstanceState.getString("score1").toString();
    		score2 = savedInstanceState.getString("score2").toString();
    		setDate(formattedDate);
    		setText(team1, score1, team2, score2);
    	}
    }
    
//    @SuppressLint("ShowToast")
//	@Override
//    public void onConfigurationChanged(Configuration newConfig) {
//    	super.onConfigurationChanged(newConfig);
//    	if(newConfig.orientation==Configuration.ORIENTATION_LANDSCAPE)
//    	{
//    		FragmentManager manager = getSupportFragmentManager();
//    		DateFragment df = (DateFragment) manager.findFragmentById(R.id.fragment_date);
//    		df.makeSmall();
//    		TeamFragment tf = (TeamFragment) manager.findFragmentById(R.id.fragment_team);
//    		tf.makeSmall();
//    	}
//    	else if(newConfig.orientation==Configuration.ORIENTATION_PORTRAIT)
//    	{
//    		FragmentManager manager = getSupportFragmentManager();
//    		DateFragment df = (DateFragment) manager.findFragmentById(R.id.fragment_date);
//    		df.makeLarge();
//    		TeamFragment tf = (TeamFragment) manager.findFragmentById(R.id.fragment_team);
//    		tf.makeLarge();
//    	}
////    	Toast.makeText(this, "Config Changed", Toast.LENGTH_LONG).show();
//    }
    
    
    @SuppressLint("SimpleDateFormat")
	public void showDatePickerDialog(View v) {
    	 //My DatePicker
        dp = new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener()
		{

			@SuppressLint("NewApi") @Override
			public void onDateSet(DatePicker view, int year,
				int monthOfYear, int dayOfMonth) {
				// TODO Auto-generated method stub
				Calendar c = Calendar.getInstance();
				c.set(year, monthOfYear, dayOfMonth);
				SimpleDateFormat sdf = new SimpleDateFormat("MMMM dd, yyyy");
				formattedDate = sdf.format(c.getTime());
				if (changeDate==true)
				{
//					Log.d("date","testing");
					setDate(formattedDate);
					changeDate=false;
				}
			}
			
		}
        , 2013, Calendar.APRIL, 17);
        dp.setButton(DialogInterface.BUTTON_POSITIVE, getString(R.string.done), new DialogInterface.OnClickListener() {
        	@Override
        	public void onClick(DialogInterface dialog, int which) {
        		// TODO Auto-generated method stub
        		changeDate = true;
//        		Log.d("button","hello");
        	}
        });
        //End of My DatePicker
    	dp.show();
    }
    
    public void clickGame(View v) {
    		td = new TeamDialog();
    		FragmentManager manager = getSupportFragmentManager();
    		td.show(manager, getString(R.string.enter_game));
    }
    
   
    
    @SuppressLint("NewApi")
	public void clickNext(View v) {
//    	Intent i = new Intent(this, this.getClass());
    	//can use the following declaration also
    	//i.setClass("com.example.charleswengscoring", "com.example.charleswengscoring.MainActivity");
//    	finish();
//    	startActivity(i);
//    	Intent intent = getIntent();
//    	intent.removeExtra("myDate");
//    	Intent inte = new Intent();
//    	finish();
//    	startActivity(intent);
//    	recreate();
    	formattedDate = getString(R.string.date);//"Date";//(String) findViewById(R.string.date).toString();
    	team1 = getString(R.string.team_1);//"Team 1";//(String) findViewById(R.string.team_1).toString();
    	team2 = getString(R.string.team_2);//"Team 2";//(String) findViewById(R.string.team_2).toString();
    	score1 = getString(R.string.zero);//"0";//(String) findViewById(R.string.zero).toString();
    	score2 = getString(R.string.zero);
    	setDate(getString(R.string.date));
    	setText(getString(R.string.team_1), getString(R.string.zero), getString(R.string.team_2), getString(R.string.zero));
//    	this.recreate();
    }

	@Override
	public void setDate(String data) {
		// TODO Auto-generated method stub
		FragmentManager manager = getSupportFragmentManager();
		DateFragment df = (DateFragment) manager.findFragmentById(R.id.fragment_date);
//		Toast.makeText(this, "Date Saved", Toast.LENGTH_SHORT).show();
		df.changeDate(data);
	}

	@Override
	public void setText(String team1, String score1, String team2, String score2) {
		// TODO Auto-generated method stub
		FragmentManager manager = getSupportFragmentManager();
		TeamFragment tf = (TeamFragment) manager.findFragmentById(R.id.fragment_team);
//		if (team1.length()==0 || team2.length()==0 || score1.length()==0 | score2.length()==0)
//			return;
		this.team1 = team1;
		this.team2 = team2;
		this.score1 = score1;
		this.score2 = score2;
		tf.changeTexts(team1, score1, team2, score2);
	}
	
}
