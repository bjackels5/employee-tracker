// Can I use this to show what just happened at the bottom of the screen? "Employee added", e.g.
// var ui = new inquirer.ui.BottomBar();
//
// // pipe a Stream to the log zone
// outputStream.pipe(ui.log);
//
// // Or simply write output
// ui.log.write('something just happened.');
// ui.log.write('Almost over, standby!');
//
// // During processing, update the bottom bar content to display a loader
// // or output a progress bar, etc
// ui.updateBottomBar('new bottom bar content');


// const mysql = require('mysql2');
const figlet = require('figlet');
const inquirer = require('inquirer');

const db = require('./db/connection');
const { listAllDepartments, addADepartment, getDepartmentNamesAndIds } = require('./db/departmentDB.js');
const { listAllRoles, addARole, getRoleTitlesAndIds } = require('./db/roleDB.js');
const empDB = require('./db/employeeDB.js');

cVwEmps = "View All Employees";
cVwEmpsDept = "View All Employees By Department";
cVwEmpsRole = "View All Employees By Role";
cVwEmpsMgr = "View All Employees By Manager";
cUpEmpRole = "Update an Employee's Role";
cUpEmpMgr = "Update an Employee's Manager";
cAddEmp = "Add An Employee";
cRmEmp = "Remove An Employee";
cVwDepts = "View All Departments";
cAddDept = "Add A Department";
cVwRoles = "View All Roles";
cAddRole = "Add A Role";
cExit = "Exit";

const validateInput = (str, message) => {
    if (str) {
        return true;
    } else {
        console.log(message);
        return false;
    }
};


const whatNext = [
    {
        type: 'list',
        name: 'whatNext',
        message: 'What do you want to do?',
        choices: [cVwEmps,
            cVwEmpsDept,
            cVwEmpsRole,
            cVwEmpsMgr,
            cAddEmp,
            cUpEmpRole,
            cVwDepts,
            cAddDept,
            cVwRoles,
            cAddRole,
            cExit
        ]
    },
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's name?",
        validate: theInput => validateInput(theInput, "The employee's first name is required."),
        when(answers) {
            return (answers.whatNext === cAddEmp);
        },
    },
    {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the department?',
        validate: theInput => validateInput(theInput, "The department name is required."),
        when(answers) {
            return (answers.whatNext === cAddDept);
        },
    },
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?',
        validate: theInput => validateInput(theInput, "The role title is required."),
        when(answers) {
            return (answers.whatNext === cAddRole);
        },
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?',
        validate: theInput => validateInput(theInput, "The role salary is required."),
        when(answers) {
            return (answers.whatNext === cAddRole);
        },
    }

];

const promptForEmpAndRole = () => {
    return new Promise(function (resolve, reject) {
        empDB.getEmployeeNamesAndIds(db)
            .then(employees => {
                const whichEmp = [
                    {
                        type: 'list',
                        name: 'employee',
                        message: `Whose role do you want to modify?`,
                        choices: employees
                    }
                ];

                inquirer.prompt(whichEmp)
                    .then(empAnswer => {
                        // the employee has been chosen, now the role has to be chosen
                        empName = employees.filter(emp => emp.value === empAnswer.employee)[0].name;
                        getRoleTitlesAndIds(db)
                            .then(roles => {
                                const whichRole = [
                                    {
                                        type: 'list',
                                        name: 'role',
                                        message: `What is ${empName}'s new role?`,
                                        choices: roles
                                    }
                                ];
                                inquirer.prompt(whichRole)
                                    .then(roleAnswer => {
                                        // the employee and the role have both been chosen
                                        empDB.updateEmployeeRole(db, empAnswer.employee, roleAnswer.role);
                                        resolve("Employee Role Updated");
                                    });
                            });
                    });
            });
    });
}

const promptForDept = (roleTitle, roleSalary) => {
    return new Promise(function (resolve, reject) {
        getDepartmentNamesAndIds(db)
            .then(departments => {
                const whichDept = [
                    {
                        type: 'list',
                        name: 'dept',
                        message: `To which department does the role ${roleTitle} belong?`,
                        choices: departments
                    }
                ];

                inquirer.prompt(whichDept)
                    .then(answer => {
                        /* now that we have the role title and the department id, create the new role */
                        addARole(db, roleTitle, roleSalary, answer.dept);
                        resolve(`Role ${roleTitle} Created`);
                    })
            });
    });
}


const promptUser = (db) => {
    return inquirer.prompt(whatNext)
        .then(answer => {
            switch (answer.whatNext) {
                case cVwEmps:
                    empDB.listAllEmployees(db)
                        .then(() => {
                            return promptUser(db);
                        })

                    break;
                case cVwEmpsDept:
                    empDB.listAllEmployeesByDepartment(db)
                        .then(() => {
                            return promptUser(db);
                        })
                    break;
                case cVwEmpsRole:
                    empDB.listAllEmployeesByRole(db)
                        .then(() => {
                            return promptUser(db);
                        })
                    break;
                case cVwEmpsMgr:
                    empDB.listAllEmployeesByManager(db)
                        .then(() => {
                            return promptUser(db);
                        })
                    break;
                case cAddEmp:
                    return promptUser(db);
                    // empDB.addAnEmployee(db, "Jeanne", "Benoit", 9, 3)
                    // .then( () => {
                    //     return promptUser(db);
                    // })
                    break;
                case cUpEmpRole:
                    promptForEmpAndRole()
                        .then(() => {
                            return promptUser(db);
                        });
                    break;
                case cVwDepts:
                    listAllDepartments(db)
                        .then(() => {
                            return promptUser(db);
                        });
                    break;
                case cAddDept:
                    addADepartment(db, answer.deptName)
                        .then(() => {
                            return promptUser(db);
                        });
                    break;
                case cVwRoles:
                    listAllRoles(db)
                        .then(() => {
                            return promptUser(db);
                        });
                    break;
                case cAddRole:
                    promptForDept(answer.roleTitle, answer.roleSalary)
                        .then(() => {
                            return promptUser(db);
                        });
                    break;
                default:
                    return db;
            }
        });
};


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log(figlet.textSync('Employee\n       Tracker', { horizontalLayout: 'fitted', verticalLayout: 'fitted' }));
    promptUser(db)
        .then(db => {
            // console.log("how do I exit out?");
            // db.close();
        })
        .catch(err => {
            console.log(err);
        });

    // works 20210904 1748
    // empDB.listAllEmployees(db)
    // .then( () => {
    //     // console.log(employees);
    //     console.log('employees displayed');
    // })


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
    //    empDB.getEmployeeNamesAndIds(db)
    //    .then(employees => {
    //        console.log(employees);
    //    })
    /*
    getRoleTitlesAndIds(db)
    .then(roles => {
        console.log(roles);
    })
    */
    //  getDepartmentNamesAndIds(db)
    //  .then(departments => {
    //      console.log(departments);
    //  })

    //    db.close(); call this when user chooses to exit

    //    .catch(err => { console.log(err); });
});

