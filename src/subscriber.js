const cote = require('cote')

function Subscriber(options) {
    const subscriber = new cote.Subscriber(options)
    return subscriber
}


module.exports = { Subscriber }
