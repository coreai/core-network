const { log } = require('./utils')

/**
 * Determines if data is valid
 * @param {*} data 
 * @returns 
 */
function Validator(parameters, data) {
    log(parameters, "Validating", data)
    let dataValid = validateData(data)
    if(dataValid === false) { log(parameters, "Data inValid --> data malformed", data); return false }
    let heardSelf = hearSelf(parameters, data)
    if (heardSelf === true) { log(parameters, "Data inValid --> data from self", data); return false }
    log(parameters, "Data Valid", data)
    let output = validateOutput(parameters, data.output)
    return output
}

function hearSelf(parameters, data) {
    if (typeof data === 'object' && data.sender && data.sender === parameters.name) return true
}

function validateData(data) {
    if (typeof data !== 'object') return false
    if (typeof data.sender !== 'string') return false
    return true
}

function validateOutput(parameters, output) {
    if (typeof output === 'null' || output === null) { log(parameters, "output inValid --> null", output); return false }
    if (typeof output === 'undefined' || output === undefined) { log(parameters, "output inValid  --> undefined", output); return false }
    if (typeof output === 'number' && isNaN(output)) { log(parameters, "output inValid --> NaN", output); return false }
    log(parameters, "Output Valid", output)
    return output

}

module.exports = { Validator }