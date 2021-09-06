const runSql = require('./dbutils.js');

const listAllDepartments = db => {
    let sql = `SELECT name AS Departments FROM departments`;
    return runSql(db, sql);
}

const listAllDepartmentBudgets = db => {
    const sql = `SELECT departments.name AS Department, 
                CONCAT('$', FORMAT(SUM(roles.salary), 'D')) AS Budget
                FROM employees emp
                JOIN roles
                ON emp.role_id = roles.id
                JOIN departments
                ON roles.department_id = departments.id
                GROUP BY departments.id`;
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
                    removeADepartment,
                    listAllDepartmentBudgets
                };