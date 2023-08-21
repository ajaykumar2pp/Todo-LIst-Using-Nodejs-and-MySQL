require('dotenv').config();
const mysql = require('mysql')
const coonectMySQL = mysql.createConnection({
    host:process.env.LOCALHSOT,
    port:process.env.DB_PORT,
    user:process.env.USER,
    database:process.env.DATABASE,
    password: process.env.PASSWORD
})

coonectMySQL.connect((err)=>{
    if(err){
      console.log("mysql not connected")
    }else{
        console.log("MySQL Successful Connected")
    }

})

module.exports = coonectMySQL;

