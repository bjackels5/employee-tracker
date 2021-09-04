const mysql = require('mysql2');
const db = require('./db/connection');

/*
const menu = [
    {
        type: 'list',
        name: 'whattodo',
        message: 'What would you like to do:',
        choices: [  "View All Departments",
                    "View All Roles",
                    "Add A Department",
                    "Add A Role",
                    "Add An Employee",
                    "Update an Employee Role"
        ]
    }
];
*/

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});    