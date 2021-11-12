const { Validator } = require('./validator')
const { Parser } = require('./parser')
const { log } = require('./utils')
const defaults = require('./parameters/defaults.json')
const { Subscriber, Publisher } = require('cote')

function Core(functions, parameters) {
    return Build(functions, Parameterize(parameters))
}

function Build(functions, parameters) {
    if (parameters.generator && parameters.generator !== 'false') {
        const publisher = new Publisher({ ...parameters, name: parameters.name + "_publisher" })
        if (typeof parameters.generator === 'number') return setInterval(() => Promise.resolve(functions())
            .then(output => publisher.publish(parameters.broadcasts[0], output))
            .catch(err => log(parameters, 'Outputting', err)), parameters.generator)
        else return Promise.resolve(functions())
            .then(output => publisher.publish(parameters.broadcasts[0], output))
            .catch(err => log(parameters, 'Outputting', err))
    }
    else {
        const publisher = new Publisher({ ...parameters, name: parameters.name + "_publisher" })
        const subscriber = new Subscriber({ ...parameters, name: parameters.name + "_subscriber" })
        parameters.subscribesTo.forEach(channel => {
            subscriber.on(channel, data => {
                let valid_data = Validator(parameters, Parser(parameters, data))
                if (valid_data !== false) {
                    log(parameters, "Processing", data)
                    Promise.resolve(functions(valid_data))
                        .then(output => publisher.publish(parameters.broadcasts[0], output))
                        .catch(err => log(parameters, 'Outputting', err))
                }
            })
        })
        return { publisher, subscriber }
    }
    // log(parameters, "Build", state)
}

function Parameterize(parameters) {
    if (!parameters) parameters = {}
    if (!parameters.name || parameters.name.length === 0) parameters.name = defaults.name + Date.now()
    if (!parameters.broadcasts) parameters.broadcasts = [parameters.name + '_' + defaults.broadcasts[0]]
    if (!parameters.subscribesTo && !parameters.generator) parameters.subscribesTo = defaults.subscribesTo
    if (!parameters.logging) parameters.logging = defaults.logging
    // log(parameters, "Parameters", parameters)
    return parameters
}

module.exports = { Core }