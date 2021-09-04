// const mysql = require('mysql2');
const figlet = require('figlet');
    
const db = require('./db/connection');
const { listAllDepartments, addADepartment } = require('./db/departmentDB.js');
const { listAllRoles, addARole } = require('./db/roleDB.js');
const empDB = require('./db/employeeDB.js');

/*
const menu = [
    {
        type: 'list',
        name: 'whattodo',
        message: 'What would you like to do:',
        choices: [  "View All Employees",
                    "View All Employees By Department",
                    "View All Employees By Role",
                    "View All Employees By Manager",
                    "Update an Employee's Role"
                    "Update an Employee's Manager"
                    "Add An Employee",
                    "Remove An Employee",
                    "View All Departments",
                    "Add A Department",
                    "View All Roles",
                    "Add A Role",
        ]
    }
];
*/

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log(figlet.textSync('Employee\n       Tracker', { horizontalLayout: 'fitted', verticalLayout: 'fitted' }));
    /*
    listAllDepartments(db);
    addADepartment(db, "New Department");
    listAllDepartments(db);
    listAllRoles(db);
    addARole(db, "Junior Lab Assistant", 80000, 5);
    listAllRoles(db);
    empDB.listAllEmployees(db);
    empDB.listAllEmployeesByDepartment(db);
    empDB.listAllEmployeesByManager(db);
    empDB.listAllEmployeesByRole(db);
    empDB.addAnEmployee(db, "Jeanne", "Benoit", 9, 3);
    empDB.listAllEmployees(db);
    empDB.updateEmployeeRole(db, 5, 2);
    empDB.listAllEmployees(db);
    empDB.updateEmployeeManager(db, 5, 6);
    empDB.listAllEmployees(db);
    empDB.removeAnEmployee(db, 14);
    */
   empDB.getEmployeeNamesAndIds(db)
   .then(employees => {
        console.log(employees);
   })
});

