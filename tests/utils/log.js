/**
 * 
 * @param {*} parameters 
 * @param {*} data 
 * @returns 
 */
function log(parameters, data) {
    if (parameters.logging === true) console.log(`[${parameters.name}] ${new Date()} :`, data)
    return data
}