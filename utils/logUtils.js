const cTable = require('console.table');

// I kept changing my mind how I wanted to display messages and tables, but I wanted them all to have the same format. I got tired
// of replacing things in multiple places, so I wrote these tiny functions.

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
