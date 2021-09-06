const runSql = require('./dbutils.js');

const listAllRoles = db => {

    let sql =   `SELECT title AS Role,
                        CONCAT('$', FORMAT(salary, 'D')) AS Salary,
                        departments.name AS Department
                FROM roles
                JOIN departments
                ON roles.department_id = departments.id`;

    return runSql(db, sql);
}

const addARole = (db, title, salary, department_id) => {
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    let params = [title, salary, department_id];

    return runSql(db, sql, params);
}

const getRoleTitlesAndIds = db => {
    const sql = `SELECT title AS name, id AS value FROM roles`
    return runSql(db, sql);
}

const removeARole = (db, roleId) => {
    const sql = `DELETE FROM roles WHERE id=?`;
    return runSql(db, sql, roleId);
}

module.exports = { listAllRoles, addARole, getRoleTitlesAndIds, removeARole };