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
    let state
    if (parameters.generator && parameters.generator !== 'false') {
        if (typeof parameters.generator === 'number') state = setInterval(() => Publisher(parameters, functions()), parameters.generator)
        else state = Publisher(parameters, functions())
    }
    else {
        state = Subscriber(parameters, data => Process(functions, parameters, data))
    }
    return state
}

/**
 * 
 * @param {Object} parameters - setup for publisher and subscriber
 * @param {function} functions - callback to the function graph to be run in service, must return
 */
function Parameterize(functions, parameters) {
    // if (!parameters) parameters = defaults
    if (!parameters.broadcasts) parameters.broadcasts = defaults.broadcasts
    if (!parameters.subscribesTo) parameters.subscribesTo = defaults.subscribesTo
    if (!parameters.name || parameters.name.length === 0) parameters.name = defaults.name
    // log(functions, parameters, parameters)
    return parameters
}

function Process(functions, parameters, data) {
    log(parameters, "Processing", data)
    let output = functions(log(parameters, "Validating", Validator(log(parameters, "Parsing", Parser(data)))))
    Publisher(parameters, output)
    return output
}

module.exports = { Core }