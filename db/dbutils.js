const runSql = (db, sql, params = null) => {
    return new Promise(function (resolve, reject) {
        db.query(sql, params, (err, rows) => {
            if (rows === undefined || rows === null) {
                reject(new Error(`Error rows is undefined/null after running sql: ${sql} with params ${params}`));
            } else {
                resolve(rows);
            }
        });
    });      
}

module.exports = runSql;