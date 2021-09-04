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
    let sql = sqlAllEmps() + sqlAdd;

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
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    let params = [firstName, lastName, roleId, managerId];
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        logMessage(`Employee ${firstName} ${lastName} added`);
    });
}

module.exports = {
                    listAllEmployees,
                    listAllEmployeesByDepartment,
                    listAllEmployeesByManager,
                    listAllEmployeesByRole,
                    addAnEmployee
                 };