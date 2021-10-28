const { Publisher, Publish } = require('./publisher')
const { Subscriber } = require('./subscriber')
const { Validator } = require('./validator')
const { Parser } = require('./parser')
const { log } = require('./utils')
const defaults = require('./parameters/defaults.json')
const branchy = require('branchy')



function Core(functions, parameters) {
    return Build(functions, Parameterize(parameters))
}

function Build(functions, parameters) {
    let state = State(parameters)
    if (parameters.generator && parameters.generator !== 'false') {
        let options = Options(parameters, state, 'publisher')
        let publisher = Publisher(options)
        state = State(parameters, state, { publisher })
        if (typeof parameters.generator === 'number') setInterval(() => Publish(options, functions()), parameters.generator)
        else Publish(options, functions())
    }
    else {
        let publisher = Publisher(Options(parameters, state, 'publisher'))
        state = State(parameters, state, { publisher })
        let subscriber = Subscriber(Options(parameters, state, 'subscriber'), data => {
            log(parameters, "Processing", data)
            let valid_data = Validator(parameters, Parser(parameters, data))
            if (valid_data !== false) {
                let output = functions(valid_data)
                Publish(Options(parameters, state, 'publisher'), output)
            }
        })
        state = State(parameters, state, { subscriber })
    }
    console.log('STATE:', state)

    // log(parameters, "Build", state)
}

function State(parameters, state, { publisher, subscriber } = {}) {
    if (!state) state = {}
    if (!state[parameters.name]) {
        state[parameters.name] = {}
        Object.assign(state[parameters.name], parameters)
    }
    if (publisher) {
        state[parameters.name].publisher = publisher
    }

    if (subscriber) {
        state[parameters.name].subscriber = subscriber
    }
    return state
}

function Options(parameters, state, type) {
    try {
        state[parameters.name].name = parameters.name + '_' + type
        return state[parameters.name]
    } catch (error) {
        log(parameters, `No options for ${parameters.name} in state -->`, state)
    }
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