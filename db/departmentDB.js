const { logTable, logMessage } = require('../utils/logUtils.js');
const runSql = require('./dbutils.js');

const listAllDepartments = db => {
    let sql = `SELECT name AS Departments FROM departments`;

    return runSql(db, sql)
    .then(departments => {
        logTable(departments);
    })
}

const addADepartment = (db, name) => {
    let sql = `INSERT INTO departments (name) VALUES (?)`;
    return runSql(db, sql, name);
    // .then( () => {
    //     logMessage(`Department ${name} added`);
    // })
}

const getDepartmentNamesAndIds = (db) => {
    const sql = `SELECT name, id AS value FROM departments`
    return runSql(db, sql);
    // .then( () => {
    //     console.log('returning dept names and ids');
    //     // do nothing
    // });
}


module.exports = { listAllDepartments, addADepartment, getDepartmentNamesAndIds };