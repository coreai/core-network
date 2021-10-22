const cote = require('cote')
const { log } = require('./utils')

let publisher

function Publisher(options, data) {
    if (!publisher) publisher = new cote.Publisher(options)
    log(options, "Publishing - " + options.broadcasts[0], data)
    publisher.publish(options.broadcasts[0], JSON.stringify(data))
    return publisher
}

module.exports = { Publisher }