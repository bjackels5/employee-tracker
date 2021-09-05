const { logTable, logMessage } = require('../utils/logUtils.js');
const runSql = require('./dbutils.js');

const listAllRoles = db => {

    let sql =   `SELECT title AS Role,
                        CONCAT('$', FORMAT(salary, 'D')) AS Salary,
                        departments.name AS Department
                FROM roles
                JOIN departments
                ON roles.department_id = departments.id`;

    return runSql(db, sql)
    .then(roles => {
        logTable(roles);
    });
}

const addARole = (db, title, salary, department_id) => {
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    let params = [title, salary, department_id];

    return runSql(db, sql, params);
    // .then( () => {
    //     logMessage(`Role ${title} added`);
    // });
}

const getRoleTitlesAndIds = db => {
    const sql = `SELECT title AS name, id AS value FROM roles`
    return runSql(db, sql);
}

module.exports = { listAllRoles, addARole, getRoleTitlesAndIds };