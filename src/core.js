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
        const publisher = new Publisher({...parameters, name: parameters.name + "_publisher"})
        if (typeof parameters.generator === 'number') setInterval(() => publisher.publish(parameters.broadcasts[0], functions()), parameters.generator)
        else publisher.publish(parameters.broadcasts[0], functions())
    }
    else {
        const publisher = new Publisher({...parameters, name: parameters.name + "_publisher"})
        const subscriber = new Subscriber({...parameters, name: parameters.name + "_subscriber"})
        parameters.subscribesTo.forEach(channel => {
            subscriber.on(channel, data => {
                log(parameters, "Processing", data)
                let valid_data = Validator(parameters, Parser(parameters, data))
                if (valid_data !== false) {
                    let output = functions(valid_data)
                    publisher.publish(parameters.broadcasts[0], output)
                }
            })
        })

    }
    // log(parameters, "Build", state)
}


function Parameterize(parameters) {
    if (!parameters) parameters = {}
    if (!parameters.name || parameters.name.length === 0) parameters.name = defaults.name + Date.now()
    if (!parameters.broadcasts) parameters.broadcasts = [parameters.name + '_' + defaults.broadcasts[0]]
    if (!parameters.subscribesTo && !parameters.generator) parameters.subscribesTo = [parameters.name + '_' + defaults.subscribesTo[0]]
    if (!parameters.logging) parameters.logging = defaults.logging
    // log(parameters, "Parameters", parameters)
    return parameters
}



module.exports = { Core }