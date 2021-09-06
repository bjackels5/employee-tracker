const runSql = require('./dbutils.js');

const listAllDepartments = db => {
    let sql = `SELECT name AS Departments FROM departments`;
    return runSql(db, sql);
}

const addADepartment = (db, name) => {
    let sql = `INSERT INTO departments (name) VALUES (?)`;
    return runSql(db, sql, name);
}

const getDepartmentNamesAndIds = (db) => {
    const sql = `SELECT name, id AS value FROM departments`
    return runSql(db, sql);
}


module.exports = { listAllDepartments, addADepartment, getDepartmentNamesAndIds };