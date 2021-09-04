const cTable = require('console.table');

const logTable = rows => {
    const separator = '========================================================================================';
    console.log(separator);
    console.table(rows);
    console.log(separator);
};

const logMessage = msg => {
    const separator = '===================';
    console.log(separator);
    console.log(msg);
    console.log(separator);
}

module.exports = { logTable, logMessage };
