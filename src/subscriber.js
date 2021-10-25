const cote = require('cote')
const { log } = require('./utils')

function Subscriber(state, parameters, process) {
    let options = {}
    Object.assign(options, parameters)
    if (!state.subscriber) {
        options.name = parameters.name + "_subscriber"
        state.subscriber = new cote.Subscriber(options)
    }
    log(options, 'Listening', options.subscribesTo)
    options.subscribesTo.map(channel => state.subscriber.on(channel, process))
    return state
}

module.exports = { Subscriber }
