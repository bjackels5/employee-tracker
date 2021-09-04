const { logTable, logMessage } = require('../utils/logUtils.js');

const sqlAllEmps = () => {
    return `SELECT  CONCAT(emp.first_name, ' ', emp.last_name) AS Name,
                    roles.title AS Title,
                    departments.name AS Department,
                    CONCAT('$', FORMAT(roles.salary, 'D')) AS Salary,
                    CASE WHEN emp.manager_id
                        IS NULL
                        THEN 'No Manager'
                        ELSE CONCAT(mgr.first_name, ' ', mgr.last_name)
                        END
                        AS Manager
            FROM employees emp
            JOIN roles
            ON emp.role_id = roles.id
            JOIN departments
            ON roles.department_id = departments.id
            LEFT JOIN employees mgr
            ON emp.manager_id = mgr.id
            `;
}

const listAllEmployees = (db, sqlAdd = '') => {
    const sql = sqlAllEmps() + sqlAdd;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        logTable(rows);
    });
}

const listAllEmployeesByDepartment = db => {
    listAllEmployees(db, ` ORDER BY roles.department_id`);
}

const listAllEmployeesByManager = db => {
    listAllEmployees(db, ` ORDER BY emp.manager_id`);
}

const listAllEmployeesByRole = db => {
    listAllEmployees(db, ` ORDER BY emp.role_id`);
}

const addAnEmployee = (db, firstName, lastName, roleId, managerId) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [firstName, lastName, roleId, managerId];
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        logMessage(`Employee ${firstName} ${lastName} added`);
    });
}

const updateEmployeeRole = (db, employeeId, newRoleId) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [newRoleId, employeeId];
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        logMessage(`Role update to ${newRoleId} for Employee with id ${employeeId}`);
    });
}

const updateEmployeeManager = (db, employeeId, newManagerId) => {
    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
    params = [newManagerId, employeeId];
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        logMessage(`Manager id update to ${newManagerId} for Employee with id ${employeeId}`);
    });
}

const removeAnEmployee = (db, employeeId) => {
    const sql = `DELETE FROM employees WHERE id=?`;
    db.query(sql, employeeId, (err, rows) => {
        if (err) throw err;
        logMessage(`Employee with id ${employeeId} has been deleted`);
    })
}

const getEmployeeNamesAndIds = db => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS name, id FROM employees`
    return new Promise(function (resolve, reject) {
        db.query(sql, (err, rows) => {
            if (rows === undefined || rows === null) {
                reject(new Error("Error rows is undefined/null"));
            } else {
                resolve(rows);
            }
        });
    });      
}

module.exports = {
    listAllEmployees,
    listAllEmployeesByDepartment,
    listAllEmployeesByManager,
    listAllEmployeesByRole,
    addAnEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    removeAnEmployee,
    getEmployeeNamesAndIds
};