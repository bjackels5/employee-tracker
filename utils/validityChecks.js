
const isString = testing => {
    return Boolean(testing && typeof testing === 'string');
}

const isNumber = testing => {
    return Boolean(testing && typeof testing === 'number');
}

const isValidId = (arrToCheck, testing) => {
    const idMatches = (element) => element.getId() === testing;
    return Boolean(arrToCheck.findIndex(idMatches) >= 0);
}

module.exports = { isString, isNumber, isValidId };