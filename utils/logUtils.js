const cTable = require('console.table');

// I kept changing my mind how I wanted to display messages and tables, but I wanted them all to have the same format. I got tired
// of replacing things in multiple places, so I wrote these tiny functions.

const logTable = rows => {
    const separator = '========================================================================================';
    console.log(""); // make sure the message doesn't get appended to the current row in the console
    console.log(separator);
    console.table(rows);
    console.log(separator);
};

const logMessage = msg => {
    console.log('==== ', msg, ' ====');
}

module.exports = { logTable, logMessage };
