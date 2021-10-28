const { log } = require('./utils')

/**
 * Determines if data is valid
 * @param {*} data 
 * @returns 
 */
function Validator(parameters, data) {
    log(parameters, "Validating", data)
    if (typeof data === 'null' || typeof data === 'undefined' || isNaN(data)) { log(parameters, "Data inValid", data); return false }
    log(parameters, "Data Valid", data)
    return data
}

module.exports = { Validator }