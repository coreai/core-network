const cote = require('cote')

let subscriber

function Subscriber(options, process) {
    if(!subscriber) subscriber = new cote.Subscriber(options)
    console.log('Listening on:', options.subscribesTo)
    options.subscribesTo.map(channel => subscriber.on(channel, process))
}

module.exports = { Subscriber }
