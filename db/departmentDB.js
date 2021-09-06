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

const removeADepartment = (db, deptId) => {
    const sql = `DELETE FROM departments WHERE id=?`;
    return runSql(db, sql, deptId);
}




module.exports = {  listAllDepartments,
                    addADepartment,
                    getDepartmentNamesAndIds,
                    removeADepartment
                };