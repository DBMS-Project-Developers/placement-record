const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6442297',
    password: 'A21ACLIS3M',
    database: 'sql6442297'
})

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySQL Connected");
})

module.exports = db;