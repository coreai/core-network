/**
 * 
 * @param {object} parameters node parameters
 * @param {string} process name of process that is being run
 * @param {*} data the output to be logged
 * @returns 
 */
function log(parameters, process, data) {
    if (parameters.logging === true) console.log(`[${parameters.name}] ${process} :`, data)
    return data
}

/**
 * Determine if two arrays are equal (non-sequential)
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i])

module.exports = { log, equals }