const { log } = require('./utils')

function Parser(parameters, data) {
    log(parameters, `Parsing {${typeof data}}`, data)
    try {
        if (typeof data === 'string') return JSON.parse(data)
        else return data
    } catch (error) {
        try { return JSON.stringify(data) }
        catch (error) { return data }
    }
}

module.exports = { Parser }