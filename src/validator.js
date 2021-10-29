const { log } = require('./utils')

/**
 * Determines if data is valid
 * @param {*} data 
 * @returns 
 */
function Validator(parameters, data) {
    log(parameters, "Validating", data)
    if (typeof data === 'null' || data === null) { log(parameters, "Data inValid --> null", data); return false }
    if (typeof data === 'undefined'|| data === undefined) { log(parameters, "Data inValid  --> undefined", data); return false }
    if (typeof data === 'number' && isNaN(data)) { log(parameters, "Data inValid --> NaN", data); return false }
    log(parameters, "Data Valid", data)
    return data
}

module.exports = { Validator }