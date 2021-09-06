// const mysql = require('mysql2');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { logMessage } = require('./utils/logUtils.js')

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
        message: "Please enter the employee's first name: ",
        validate: theInput => validateInput(theInput, "The employee's first name is required."),
        when(answers) {
            return (answers.whatNext === cAddEmp);
        },
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Please enter the employee's last name: ",
        validate: theInput => validateInput(theInput, "The employee's last name is required."),
        when(answers) {
            return (answers.whatNext === cAddEmp);
        },
    },
    {
        type: 'input',
        name: 'deptName',
        message: 'Please enter the name of the department: ',
        validate: theInput => validateInput(theInput, "The department name is required."),
        when(answers) {
            return (answers.whatNext === cAddDept);
        },
    },
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Please enter the title of the role: ',
        validate: theInput => validateInput(theInput, "The role title is required."),
        when(answers) {
            return (answers.whatNext === cAddRole);
        },
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "Please enter the role's salary: ",
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
                empDB.getEmployeeNamesAndIds(db)
                    .then(managers => {
                        const whichRoleAndManager = [
                            {
                                type: 'list',
                                name: 'manager',
                                message: `Please select a manager for the employee: `,
                                choices: managers
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: `Please select a role for the employee: `,
                                choices: roles
                            }
                        ];

                        inquirer.prompt(whichRoleAndManager)
                            .then(answer => {
                                // the employee role and manager have been chosen
                                empDB.addAnEmployee(db, firstName, lastName, answer.role, answer.manager);
                                resolve("Employee Added");
                            });
                    });
            });
    });
}


const promptUpdateEmployeeRole = () => {
    return new Promise(function (resolve, reject) {
        empDB.getEmployeeNamesAndIds(db)
            .then(employees => {
                getRoleTitlesAndIds(db)
                    .then(roles => {
                        const whichEmployeeAndRole = [
                            {
                                type: 'list',
                                name: 'employee',
                                message: `Please select the employee to modify: `,
                                choices: employees
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: `Please select the employee's new role: `,
                                choices: roles
                            }
                        ];
                        inquirer.prompt(whichEmployeeAndRole)
                            .then(answer => {
                                // the employee and the role have both been chosen
                                empDB.updateEmployeeRole(db, answer.employee, answer.role);
                                resolve("Employee Role Updated");
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
                        message: `Please select the employee who has a new manager: `,
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        // I would like to have this question say `"Who is ${name}'s new manager?`, but then I'd have to do nested prompts.
                        message: `Please select the employee's new manager: `,
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
                        message: `Please select a department for the role: `,
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
                            logMessage('All employees have been listed.');
                            return promptUser();
                        })

                    break;
                case cVwEmpsDept:
                    empDB.listAllEmployeesByDepartment(db)
                        .then(() => {
                            logMessage('All employees have been listed by department.');
                            return promptUser();
                        })
                    break;
                case cVwEmpsRole:
                    empDB.listAllEmployeesByRole(db)
                        .then(() => {
                            logMessage('All employees have been listed by role.');
                            return promptUser();
                        })
                    break;
                case cVwEmpsMgr:
                    empDB.listAllEmployeesByManager(db)
                        .then(() => {
                            logMessage('All employees have been listed by manager.');
                            return promptUser();
                        })
                    break;
                case cAddEmp:
                    promptAddEmployee(answer.firstName, answer.lastName)
                        .then(() => {
                            logMessage('An employee has been added.');
                            return promptUser();
                        });
                    break;
                case cUpEmpRole:
                    promptUpdateEmployeeRole()
                        .then(() => {
                            logMessage("An employee's role has been updated.");
                            return promptUser();
                        });
                    break;
                case cUpEmpMgr:
                    promptUpdateEmployeeManager()
                        .then(() => {
                            logMessage("An employee's manager has been updated.");
                            return promptUser();
                        });
                    break;
                case cVwDepts:
                    listAllDepartments(db)
                        .then(() => {
                            logMessage("All departments have been listed.");
                            return promptUser();
                        });
                    break;
                case cAddDept:
                    addADepartment(db, answer.deptName)
                        .then(() => {
                            logMessage("A department has been added.");
                            return promptUser();
                        });
                    break;
                case cVwRoles:
                    listAllRoles(db)
                        .then(() => {
                            logMessage("All roles have been listed.");
                            return promptUser();
                        });
                    break;
                case cAddRole:
                    promptAddRole(answer.roleTitle, answer.roleSalary)
                        .then(() => {
                            logMessage("A roles has been added.");
                            return promptUser();
                        });
                    break;
                case cExit:
                    logMessage("Thank you for using Employee Tracker. Have a great day!");
                    return;
                    break;
                default:
                    return;
            }
        });
};

db.connect(err => {
    if (err) throw err;
    console.log(figlet.textSync('Employee\n       Tracker', { horizontalLayout: 'fitted', verticalLayout: 'fitted' }));
    promptUser()
        .then(() => {
            // console.log("how do I exit out?");
        })
        .catch(err => {
            console.log(err);
        });
});