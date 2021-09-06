const cTable = require('console.table');

const logTable = rows => {
    const separator = '========================================================================================';
    console.log(separator);
    console.table(rows);
    console.log(separator);
};

const logMessage = msg => {
    console.log('==== ', msg, ' ====');
}

module.exports = { logTable, logMessage };
