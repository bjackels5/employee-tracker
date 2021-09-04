const { logTable, logMessage } = require('../utils/logUtils.js');

const listAllDepartments = db => {
    let sql = `SELECT name AS Departments FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        logTable(rows);
    });
}

const addADepartment = (db, name) => {
    let sql = `INSERT INTO departments (name) VALUES (?)`;
    db.query(sql, name, (err, rows) => {
        if (err) throw err;
        logMessage(`Department ${name} added`);
    });
}

module.exports = { listAllDepartments, addADepartment };