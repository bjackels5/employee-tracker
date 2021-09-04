const mysql = require('mysql2');


// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'StupidPublicPassword',
        database: 'employees'
    },
    console.log('Connected to the employee database.')
);

module.exports = db;