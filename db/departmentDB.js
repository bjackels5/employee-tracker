const cTable = require('console.table');

const listAllDepartments = db => {
    let sql = `SELECT name AS Departments FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('-----------------')
        console.table(rows);
        console.log('-----------------')
    });
}

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

module.exports = { listAllDepartments, addADepartment };