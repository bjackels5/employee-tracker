const cTable = require('console.table');

const listAllRoles = db => {

    let sql =   `SELECT title AS Role,
                        CONCAT('$', FORMAT(salary, 'D')) AS Salary,
                        departments.name AS Department
                FROM roles
                JOIN departments
                ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('-----------------')
        console.table(rows);
        console.log('-----------------')
    });
}

/*
const addADepartment = (db, name) => {
    let sql = `INSERT INTO departments (name) VALUES (?)`;
    db.query(sql, name, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        console.log(`Department ${name} added`);
    });
}
*/

module.exports = listAllRoles;