const { Publisher } = require('./publisher')
const { Subscriber } = require('./subscriber')
const { Validator } = require('./validator')
const { Parser } = require('./parser')
const defaults = require('./parameters/defaults.json')


/**
 * Load parameters, subscribes to channels, runs function graph, and publishes results
 * @param {Object} parameters - setup for publisher and subscriber
 * @param {function} functions - callback to the function graph to be run in service, must return
 */
function Core(functions, parameters) {
    Build(functions, Parameterize(functions, parameters))
}

function Build(functions, parameters) {
    if (parameters.subscriber && !parameters.generator) Subscriber(parameters.subscriber, data => Process(functions, parameters, data))
    if (parameters.generator && typeof parameters.generator === 'number') setInterval(() => Publisher(parameters.publisher, functions()), parameters.generator)
    if (parameters.generator) Publisher(parameters.publisher, functions())
}

/**
 * 
 * @param {Object} parameters - setup for publisher and subscriber
 * @param {function} functions - callback to the function graph to be run in service, must return
 */
function Parameterize(functions, parameters) {
    if (!parameters) parameters = defaults
    if (!parameters.publisher) parameters.publisher = defaults.publisher
    if (!parameters.subscriber) parameters.subscriber = defaults.subscriber
    if (parameters.publisher) parameters.publisher.name = functions.name + "'s Publisher"
    if (parameters.subscriber) parameters.subscriber.name = functions.name + "'s Subscriber"
    return parameters
}

function Process(functions, parameters, data) {
    log(parameters, "Processing", data)
    let output = functions(log(parameters, "Validating", Validator(log(parameters, "Parsing", Parser(data)))))
    if (output) Publisher(parameters.publisher, output)
    return output
}

function log(parameters, process, data) {
    if (parameters.logging) console.log(`[${parameters.subscriber.name}] ${process} :`, data)
    return data
}

module.exports = { Core }