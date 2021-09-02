const isString = testing => {
    return testing && typeof testing === 'string';
}

const isNumber = testing => {
    return testing && typeof testing === 'number';
}


module.exports = { isString, isNumber };