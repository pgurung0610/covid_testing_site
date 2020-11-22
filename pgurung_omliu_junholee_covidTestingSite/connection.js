const mysql = require('mysql');

// Configuring connection to MySQL database
let conn = mysql.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'covid_testing'
});

// Connection to MySQL database
conn.connect(err => {
    if (err) {
        console.log('Connection to database failed: ' + err);
    } else {
        console.log('Successfully connected to database!');
    }
});

module.exports = conn;