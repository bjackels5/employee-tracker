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

const getDepartmentTitlesAndIds = db => {
    const sql = `SELECT name, id FROM departments`
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


module.exports = { listAllDepartments, addADepartment, getDepartmentTitlesAndIds };