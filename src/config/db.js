const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'pCXaHbpEpX',
    password: 'OSWQzYZ5gs',
    database: 'pCXaHbpEpX'
})

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySQL Connected");
})

module.exports = db;