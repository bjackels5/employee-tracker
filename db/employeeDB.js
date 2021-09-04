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

const listAllEmployees = db => {
    let sql = sqlAllEmps();

    db.query(sql, (err, rows) => {
        if (err) throw err;
        logTable(rows);
    });
}

const listAllEmployeesByDepartment = db => {
    let sql = sqlAllEmps() +   ` ORDER BY roles.department_id`; 

    db.query(sql, (err, rows) => {
        if (err) throw err;
        logTable(rows);
    });
}


const addAnEmployee = (db, title, salary, department_id) => {
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    let params = [title, salary, department_id];
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        logMessage(`Role ${title} added`);
    });
}

module.exports = { listAllEmployees, addAnEmployee, listAllEmployeesByDepartment };