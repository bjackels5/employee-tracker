const mysql = require('mysql2');
const db = require('./db/connection');
const { listAllDepartments, addADepartment } = require('./db/departmentDB.js');

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
    listAllDepartments(db);
    addADepartment(db, "New Department");
    listAllDepartments(db);
});

