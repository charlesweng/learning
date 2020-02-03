/*
 * InsertRow.java
 *
 * DBMS Implementation
 */

import com.sleepycat.db.*;
import com.sleepycat.bind.*;
import com.sleepycat.bind.tuple.*;

/**
 * A class that represents a row that will be inserted in a table in a
 * relational database.
 *
 * This class contains the code used to marshall the values of the
 * individual columns to a single key-data pair in the underlying
 * BDB database.
 */
public class InsertRow {
    private Table table;         // the table in which the row will be inserted
    private Object[] values;     // the individual values to be inserted
    private DatabaseEntry key;   // the key portion of the marshalled row
    private DatabaseEntry data;  // the data portion of the marshalled row
    private String keyStr;       // string value of key used for debugging purposes
   
    /**
     * Constructs an InsertRow object for a row containing the specified
     * values that is to be inserted in the specified table.
     *
     * @param  t  the table
     * @param  values  the values in the row to be inserted
     */
    public InsertRow(Table table, Object[] values) {
        this.table = table;
        this.values = values;
        
        // These objects will be created by the marshall() method.
        this.key = null;
        this.keyStr = null;
        this.data = null;
    }
    
    /**
     * Takes the collection of values for this InsertRow
     * and marshalls them into a key/data pair.
     */
    public void marshall() {
        Column pkCol = this.table.primaryKeyColumn();
		        
    	// if table has pkey, key will be PKEY
        if (pkCol != null) {
        	switch(pkCol.getType()) {
        	case Column.INTEGER:
        		int iKey = ((Integer) this.values[pkCol.getIndex()]).intValue();
        		this.key= generateKey(iKey);
        		this.keyStr = "" + iKey;
        		break;
        	case Column.REAL:
        		double dKey = ((Double) this.values[pkCol.getIndex()]).doubleValue();
        		this.key = generateKey(dKey);
        		this.keyStr = "" + dKey;
        		break;
        	case Column.CHAR:
        	case Column.VARCHAR:
            	this.keyStr = (String) this.values[pkCol.getIndex()];
            	this.key = generateKey(keyStr);
        	}
        }
    	// else key will be CONCATEDVALS
        else {
        	this.key = null;
        	this.keyStr = "no primary key in table";
        }
                
        TupleOutput data = new TupleOutput();
        
        // write headers
        int length = (this.table.numColumns()+1)*4;
        for (int i = 0; i < this.table.numColumns(); i++) {
        	Column col = this.table.getColumn(i);
        	if (this.values[i] == null) {
        		data.writeInt(-1);
        	} else if (col.isPrimaryKey()) {
        		data.writeInt(-2);
        	} else {
	        	data.writeInt(length);
	
	        	if (col.getType() != Column.VARCHAR) {
	        		length += this.table.getColumn(i).getLength();
	        	} else {
	        		length += ((String) this.values[i]).length();
	        	}
        	}
        }
    	data.writeInt(length);

        
        // write data
        for (int i = 0; i < this.table.numColumns(); i++) {
        	Column col = this.table.getColumn(i);
        	if (col.isPrimaryKey() || this.values[i] == null) {
        		continue;
        	}
        	switch (col.getType()) {
        	case Column.INTEGER:
        		data.writeInt(((Integer)this.values[i]).intValue());
        		break;
        	case Column.REAL:
        		data.writeDouble(((Double)this.values[i]).doubleValue());
        		break;
        	case Column.CHAR:
        	case Column.VARCHAR:
        		data.writeBytes((String)this.values[i]);
        		break;
        	}
        }
        
        this.data = new DatabaseEntry(data.getBufferBytes(), 
        		0, data.getBufferLength());
    }
    
    private DatabaseEntry generateKey(int s) {
    	TupleOutput tup = new TupleOutput();
    	tup.writeInt(s);
    	
    	DatabaseEntry key = new DatabaseEntry(tup.getBufferBytes(),
    			0, tup.getBufferLength());
    	
    	return key;	
    }
    
    private DatabaseEntry generateKey(double s) {
    	TupleOutput tup = new TupleOutput();
    	tup.writeDouble(s);
    	
    	return new DatabaseEntry(tup.getBufferBytes(),
    			0, tup.getBufferLength());
    }
    
    private DatabaseEntry generateKey(String s) {
    	TupleOutput tup = new TupleOutput();
    	tup.writeBytes(s);
    	
    	return new DatabaseEntry(tup.getBufferBytes(),
    			0, tup.getBufferLength());
    }
    
    /**
     * Returns the DatabaseEntry for the key in the key/data pair for this row.
     *
     * @return  the key DatabaseEntry
     */
    public DatabaseEntry getKey() {
        return this.key;
    }
    
    /**
     * Returns the String for the key in the key/data pair for this row.
     * 
     * @return the keyStr String
     */
    public String getKeyStr() {
    	return this.keyStr;
    }
    
    /**
     * Returns the DatabaseEntry for the data item in the key/data pair 
     * for this row.
     *
     * @return  the data DatabaseEntry
     */
    public DatabaseEntry getData() {
        return this.data;
    }
}
