const cote = require('cote')
const { log } = require('./utils')

function Publisher(state, parameters, data) {
    let options = {}
    Object.assign(options, parameters)
    if (!state.publisher) {
        options.name = parameters.name + "_publisher"
        state.publisher = new cote.Publisher(options)
    }
    log(options, "Publishing - " + options.broadcasts[0], data)
    state.publisher.publish(options.broadcasts[0], JSON.stringify(data))
    return state
}

module.exports = { Publisher }