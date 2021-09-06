const runSql = require('./dbutils.js');

const sqlAllEmps =
    `SELECT CONCAT(emp.first_name, ' ', emp.last_name) AS Name,
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

const listAllEmployees = (db, sqlAdd = '') => {
    return runSql(db, sqlAllEmps);
}

const listAllEmployeesByDepartment = db => {
    return runSql(db, sqlAllEmps + ` ORDER BY roles.department_id`);
}

const listAllEmployeesByManager = db => {
    return runSql(db, sqlAllEmps + ` ORDER BY emp.manager_id`);
}

const listAllEmployeesByRole = db => {
    return runSql(db, sqlAllEmps + ` ORDER BY emp.role_id`);
}

const addAnEmployee = (db, firstName, lastName, roleId, managerId) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [firstName, lastName, roleId, managerId];

    return runSql(db, sql, params);
}

const updateEmployeeRole = (db, employeeId, newRoleId) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [newRoleId, employeeId];
    return runSql(db, sql, params);
}

const updateEmployeeManager = (db, employeeId, newManagerId) => {
    const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
    params = [newManagerId, employeeId];
    return runSql(db, sql, params);
}

const removeAnEmployee = (db, employeeId) => {
    const sql = `DELETE FROM employees WHERE id=?`;
    return runSql(db, sql, employeeId);
}

const getEmployeeNamesAndIds = db => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employees`
    return runSql(db, sql);
}

const listEmployeeDetails = (db, employeeId) => {
    return runSql(db, sqlAllEmps + ` WHERE emp.id =?`, employeeId);
}

module.exports = {
    addAnEmployee,
    listAllEmployees,
    listAllEmployeesByDepartment,
    listAllEmployeesByManager,
    listAllEmployeesByRole,
    listEmployeeDetails,
    getEmployeeNamesAndIds,
    removeAnEmployee,
    updateEmployeeRole,
    updateEmployeeManager
};