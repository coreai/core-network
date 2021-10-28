const cote = require('cote')
const { log } = require('./utils')

function Subscriber(options, process) {
    if (options.subscribesTo.length <= 0) {
        log(options, 'No Subscriptions', state)
        return
    }
    log(options, 'Creating new Subscriber', options.name)
    let subscriber = new cote.Subscriber(options)
    options.subscribesTo.forEach(channel => subscriber.on(channel, process))
    // let subscribesTo = Object.keys(subscriber.listenerTree)
    // console.log(subscribesTo)      
    return subscriber
     
}


function Listen(options, process) {
    log(options, 'Listening', options.subscribesTo)
    
}

module.exports = { Subscriber }
