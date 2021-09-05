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
            cUpEmpMgr,
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
        message: "Please enter the employee's first name:",
        validate: theInput => validateInput(theInput, "The employee's first name is required."),
        when(answers) {
            return (answers.whatNext === cAddEmp);
        },
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Please enter the employee's last name:",
        validate: theInput => validateInput(theInput, "The employee's last name is required."),
        when(answers) {
            return (answers.whatNext === cAddEmp);
        },
    },
    {
        type: 'input',
        name: 'deptName',
        message: 'Please enter the name of the department:',
        validate: theInput => validateInput(theInput, "The department name is required."),
        when(answers) {
            return (answers.whatNext === cAddDept);
        },
    },
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Please enter the title of the role:',
        validate: theInput => validateInput(theInput, "The role title is required."),
        when(answers) {
            return (answers.whatNext === cAddRole);
        },
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "Please enter the role's salary",
        validate: theInput => validateInput(theInput, "The role salary is required."),
        when(answers) {
            return (answers.whatNext === cAddRole);
        },
    }

];


const promptAddEmployee = (firstName, lastName) => {
    return new Promise(function (resolve, reject) {
        getRoleTitlesAndIds(db)
            .then(roles => {
                const whichRole = [
                    {
                        type: 'list',
                        name: 'role',
                        message: `Please select a role for the employee:`,
                        choices: roles
                    }
                ];

                inquirer.prompt(whichRole)
                    .then(roleAnswer => {
                        // the employee role has been chosen, now the manager has to be chosen
                        empDB.getEmployeeNamesAndIds(db)
                            .then(managers => {
                                const whichManager = [
                                    {
                                        type: 'list',
                                        name: 'manager',
                                        message: `Please select a manager for the employee:`,
                                        choices: managers
                                    }
                                ];
                                inquirer.prompt(whichManager)
                                    .then(managerAnswer => {
                                        // the role and the manager have both been chosen
                                        empDB.addAnEmployee(db, firstName, lastName, roleAnswer.role, managerAnswer.manager);
                                        resolve("Employee Added");
                                    });
                            });
                    });
            });
    });
}


const promptUpdateEmployeeRole = () => {
    return new Promise(function (resolve, reject) {
        empDB.getEmployeeNamesAndIds(db)
            .then(employees => {
                const whichEmp = [
                    {
                        type: 'list',
                        name: 'employee',
                        message: `Please select the employee to modify:`,
                        choices: employees
                    }
                ];

                inquirer.prompt(whichEmp)
                    .then(empAnswer => {
                        // the employee has been chosen, now the role has to be chosen
                        // empName = employees.filter(emp => emp.value === empAnswer.employee)[0].name;
                        getRoleTitlesAndIds(db)
                            .then(roles => {
                                const whichRole = [
                                    {
                                        type: 'list',
                                        name: 'role',
                                        message: `Please select the employee's new role:`,
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


const promptUpdateEmployeeManager = () => {
    return new Promise(function (resolve, reject) {
        empDB.getEmployeeNamesAndIds(db)
            .then(employees => {
                const whichEmpAndMgr = [
                    {
                        type: 'list',
                        name: 'employee',
                        message: `Please select the employee who has a new manager:`,
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        // I would like to have this question say `"Who is ${name}'s new manager?`, but then I'd have to do nested prompts.
                        message: `Please select the employee's new manager:`,
                        // I would like to remove the selected employee from the list, but then I'd have to do nested prompts.
                        choices: employees
                    }
                ];

                inquirer.prompt(whichEmpAndMgr)
                    .then(answer => {
                        // the employee and manager have been chosen
                        empName = employees.filter(emp => emp.value === answer.employee)[0].name;
                        mgrName = employees.filter(emp => emp.value === answer.manager)[0].name;
                        empDB.updateEmployeeManager(db, answer.employee, answer.manager);
                        resolve("Employee Manager Updated");
                    });
            });
    });
}


const promptAddRole = (roleTitle, roleSalary) => {
    return new Promise(function (resolve, reject) {
        getDepartmentNamesAndIds(db)
            .then(departments => {
                const whichDept = [
                    {
                        type: 'list',
                        name: 'dept',
                        message: `Please select a department for the role:`,
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


const promptUser = () => {
    return inquirer.prompt(whatNext)
        .then(answer => {
            switch (answer.whatNext) {
                case cVwEmps:
                    empDB.listAllEmployees(db)
                        .then(() => {
                            return promptUser();
                        })

                    break;
                case cVwEmpsDept:
                    empDB.listAllEmployeesByDepartment(db)
                        .then(() => {
                            return promptUser();
                        })
                    break;
                case cVwEmpsRole:
                    empDB.listAllEmployeesByRole(db)
                        .then(() => {
                            return promptUser();
                        })
                    break;
                case cVwEmpsMgr:
                    empDB.listAllEmployeesByManager(db)
                        .then(() => {
                            return promptUser();
                        })
                    break;
                case cAddEmp:
                    promptAddEmployee(answer.firstName, answer.lastName)
                    .then( () => {
                        return promptUser();
                    });
                    break;
                case cUpEmpRole:
                    promptUpdateEmployeeRole()
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cUpEmpMgr:
                    promptUpdateEmployeeManager()
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cVwDepts:
                    listAllDepartments(db)
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cAddDept:
                    addADepartment(db, answer.deptName)
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cVwRoles:
                    listAllRoles(db)
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cAddRole:
                    promptAddRole(answer.roleTitle, answer.roleSalary)
                        .then(() => {
                            return promptUser();
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
    promptUser()
        .then( () => {
            // console.log("how do I exit out?");
            // db.close();
        })
        .catch(err => {
            console.log(err);
        });
});

