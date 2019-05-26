const db = require('mysql')
require('dotenv').config()
connection = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
module.exports=connection
