const { Publisher } = require('./publisher')
const { Subscriber } = require('./subscriber')
const { Validator } = require('./validator')
const { Parser } = require('./parser')
const { log } = require('./utils')
const defaults = require('./parameters/defaults.json')


/**
 * Load parameters, subscribes to channels, runs function graph, and publishes results
 * @param {Object} parameters - setup for publisher and subscriber
 * @param {function} functions - callback to the function graph to be run in service, must return
 */
function Core(functions, parameters) {
    return Build(functions, Parameterize(functions, parameters))
}

function Build(functions, parameters) {
    let state = {}
    if (parameters.generator && parameters.generator !== 'false') {
        if (typeof parameters.generator === 'number') state = setInterval(() => Publisher(state, parameters, functions()), parameters.generator)
        else state = Publisher(state, parameters, functions())
    }
    else {
        state = Subscriber(state, parameters, data => {
            // console.log(parameters)
            log(parameters, "Processing", data)
            let output = functions(log(parameters, "Validating", Validator(log(parameters, "Parsing", Parser(data)))))
            state = Publisher(state, parameters, output)
            return output
        })
    }
    // log(parameters, "Build", state)
    return state
}

/**
 * 
 * @param {Object} parameters - setup for publisher and subscriber
 * @param {function} functions - callback to the function graph to be run in service, must return
 */
function Parameterize(functions, parameters) {
    if (!parameters) parameters = {}
    if (!parameters.name || parameters.name.length === 0) parameters.name = defaults.name + Date.now()
    if (!parameters.broadcasts) parameters.broadcasts = [parameters.name + '_' + defaults.broadcasts[0]]
    if (!parameters.subscribesTo) parameters.subscribesTo = [parameters.name + '_' + defaults.subscribesTo[0]]
    if (!parameters.logging) parameters.logging = defaults.logging
    log(parameters, "Parameters", parameters)
    return parameters
}

function Process(functions, parameters, data) {

}

module.exports = { Core }