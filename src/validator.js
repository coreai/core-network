const { log } = require('./utils')

/**
 * Determines if data is valid
 * @param {*} data 
 * @returns 
 */
function Validate(parameters, data) {
    log(parameters, "Validating", `${typeof data}::${data}`)
    if (typeof data === 'null' || data === null || data === 'null') { log(parameters, "Data inValid --> null", data); return false }
    if (typeof data === 'undefined'|| data === undefined || data === 'undefined') { log(parameters, "Data inValid  --> undefined", data); return false }
    if (typeof data === 'number' && isNaN(data)) { log(parameters, "Data inValid --> NaN", data); return false }
    log(parameters, "Data Valid", data)
    return data
}

module.exports = { Validate }