const { logTable, logMessage } = require('../utils/logUtils.js');

const listAllRoles = db => {

    let sql =   `SELECT title AS Role,
                        CONCAT('$', FORMAT(salary, 'D')) AS Salary,
                        departments.name AS Department
                FROM roles
                JOIN departments
                ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        logTable(rows);
    });
}

const addARole = (db, title, salary, department_id) => {
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    let params = [title, salary, department_id];
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        logMessage(`Role ${title} added`);
    });
}

module.exports = { listAllRoles, addARole };