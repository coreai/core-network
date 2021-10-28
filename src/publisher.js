const cote = require('cote')
const { log } = require('./utils')

function Publisher(options) {
    if (!options.publisher) {
        log(options, 'Creating new Publisher', options)
        return new cote.Publisher(options)
    }
}

function Publish(options, data) {
    try {
        let channel = options.broadcasts[0]
        log(options, "Publishing - " + channel, data)
        options.publisher.publish(channel, JSON.stringify(data))
    } catch (error) {
        log(options, 'Error Publishing', data)
    }
}

module.exports = { Publisher, Publish }