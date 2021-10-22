/**
 * 
 * @param {object} parameters node parameters
 * @param {string} process name of process that is being run
 * @param {*} data the output to be logged
 * @returns 
 */
function log(parameters, process, data) {
    if (parameters.logging) console.log(`[${parameters.name}] ${process} :`, data)
    return data
}

module.exports = { log }