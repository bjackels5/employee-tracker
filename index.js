const figlet = require('figlet'); // used to display the banner when the app starts
const inquirer = require('inquirer');
const { logMessage, logTable } = require('./utils/logUtils.js')

const db = require('./db/connection');
const { listAllDepartments, addADepartment, getDepartmentNamesAndIds, removeADepartment, listAllDepartmentBudgets } = require('./db/departmentDB.js');
const { listAllRoles, addARole, getRoleTitlesAndIds, removeARole } = require('./db/roleDB.js');
const empDB = require('./db/employeeDB.js');

// These values get used for the menu choices, to determine if additional inquiries need to be made, and
// for the switch after the choices is made, Much safer to have these as constants than to type/typo them more than once.
cVwEmps = "View All Employees"; // required
cVwEmpsDept = "View All Employees By Department"; // bonus requirement
cVwEmpsRole = "View All Employees By Role"; // not required - I just wanted it
cVwEmpsMgr = "View All Employees By Manager"; // bonus requirement
cVwEmpDetail = "View Employee Detail"; // not required - I just wanted it
cUpEmpRole = "Update an Employee's Role"; // required
cUpEmpMgr = "Update an Employee's Manager"; // bonus requirement
cAddEmp = "Add An Employee"; // required
cRmEmp = "Remove An Employee"; // bonus requirement
cVwDepts = "View All Departments"; // required
cAddDept = "Add A Department"; // required
cRmDept = "Remove A Department"; // bonus requirement
cVwRoles = "View All Roles"; // required
cAddRole = "Add A Role"; // required
cRmRole = "Remove A Role"; // bonus requirement
cVwDeptBudget = "View Department Budgets"; // bonus requirement
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
            cVwEmpDetail,
            cAddEmp,
            cUpEmpRole,
            cUpEmpMgr,
            cRmEmp,
            cVwDepts,
            cVwDeptBudget,
            cAddDept,
            cRmDept,
            cVwRoles,
            cAddRole,
            cRmRole,
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
                        managers.unshift({ name: `No manager`, value: null });
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
                                empDB.updateEmployeeRole(db, answer.employee, answer.role)
                                    .then(() => {
                                        empDB.listEmployeeDetails(db, answer.employee)
                                            .then(employee => {
                                                logTable(employee);
                                                resolve("Employee Role Updated");
                                            })
                                    });
                            });
                    });
            });
    });
}

const promptRemove = (namesAndIdsFcn, addFcn, elementType) => {
    return new Promise(function (resolve, reject) {
        namesAndIdsFcn(db)
            .then(options => {
                options.unshift({ name: `Cancel ${elementType} removal`, value: 0 });
                const whichElement = [
                    {
                        type: 'list',
                        name: 'chosen',
                        message: `Please select the ${elementType} to remove: `,
                        choices: options
                    }
                ];
                inquirer.prompt(whichElement)
                    .then(answer => {
                        if (answer.chosen !== 0) {
                            // a choice has been made
                            addFcn(db, answer.chosen);
                            logMessage(`An ${elementType} has been removed.`);
                            resolve(`${elementType} Removed`);
                        } else {
                            // the user chose to cancel removal
                            logMessage(`No ${elementType} has been removed.`);
                            resolve(`No ${elementType} Removed`);
                        }
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
                        message: `Please select the employee's new manager: `,
                        // I would like to remove the selected employee from the list of potential managers, but then I'd have to do nested prompts.
                        // Besides, there might be some people who really are there own managers! Yearly reviews would be crazy.
                        choices: employees
                    }
                ];

                inquirer.prompt(whichEmpAndMgr)
                    .then(answer => {
                        // the employee and manager have been chosen
                        empDB.updateEmployeeManager(db, answer.employee, answer.manager)
                            .then(() => {
                                empDB.listEmployeeDetails(db, answer.employee)
                                    .then(employee => {
                                        logTable(employee);
                                        resolve("Employee Manager Updated");
                                    })
                            });
                    });
            });
    });
}

const promptViewEmployeeDetail = () => {
    return new Promise(function (resolve, reject) {
        empDB.getEmployeeNamesAndIds(db)
            .then(employees => {
                const whichEmployee = [
                    {
                        type: 'list',
                        name: 'employee',
                        message: `Please select an employee: `,
                        choices: employees
                    }
                ];

                inquirer.prompt(whichEmployee)
                    .then(answer => {
                        // the employee has been chosen
                        empDB.listEmployeeDetails(db, answer.employee)
                            .then(employee => {
                                logTable(employee);
                                resolve("Employee Details Displayed");
                            })
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
                        // the user supplied a title and chose a department, so create the new role
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
                        .then(employees => {
                            logTable(employees);
                            logMessage('All employees have been listed.');
                            return promptUser();
                        })

                    break;
                case cVwEmpsDept:
                    empDB.listAllEmployeesByDepartment(db)
                        .then(employees => {
                            logTable(employees);
                            logMessage('All employees have been listed by department.');
                            return promptUser();
                        })
                    break;
                case cVwEmpsRole:
                    empDB.listAllEmployeesByRole(db)
                        .then(employees => {
                            logTable(employees);
                            logMessage('All employees have been listed by role.');
                            return promptUser();
                        })
                    break;
                case cVwEmpsMgr:
                    empDB.listAllEmployeesByManager(db)
                        .then(employees => {
                            logTable(employees);
                            logMessage('All employees have been listed by manager.');
                            return promptUser();
                        })
                    break;
                case cVwEmpDetail:
                    promptViewEmployeeDetail()
                        .then(() => {
                            logMessage('Employee detail has been displayed');
                            return promptUser();
                        });
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
                case cRmEmp:
                    promptRemove(empDB.getEmployeeNamesAndIds, empDB.removeAnEmployee, "employee")
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cVwDepts:
                    listAllDepartments(db)
                        .then(departments => {
                            logTable(departments)
                            logMessage("All departments have been listed.");
                            return promptUser();
                        });
                    break;
                case cVwDeptBudget:
                    listAllDepartmentBudgets(db)
                        .then(budgets => {
                            logTable(budgets)
                            logMessage("All department budgets have been listed.");
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
                case cRmDept:
                    promptRemove(getDepartmentNamesAndIds, removeADepartment, "department")
                        .then(() => {
                            return promptUser();
                        });
                    break;
                case cVwRoles:
                    listAllRoles(db)
                        .then(roles => {
                            logTable(roles);
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
                case cRmRole:
                    promptRemove(getRoleTitlesAndIds, removeARole, "role")
                        .then(() => {
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