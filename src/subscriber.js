const cote = require('cote')
const { log } = require('./utils')

let subscriber

function Subscriber(options, process) {
    if (!subscriber) subscriber = new cote.Subscriber(options)
    log(options, 'Listening', options.subscribesTo)
    options.subscribesTo.map(channel => subscriber.on(channel, process))
    return subscriber
}

module.exports = { Subscriber }
