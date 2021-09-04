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

const getRoleTitlesAndIds = db => {
    const sql = `SELECT title, id FROM roles`
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

module.exports = { listAllRoles, addARole, getRoleTitlesAndIds };