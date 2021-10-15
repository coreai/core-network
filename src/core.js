const { Publisher } = require('./publisher')
const { Subscriber } = require('./subscriber')
const { Validator } = require('./validator')
const { Parser } = require('./parser')
const defaults = require('./parameters/defaults.json')


/**
 * Load parameters, subscribes to channels, runs function graph, and publishes results
 * @param {*} parameters - setup for publisher and subscriber
 * @param {function} functions - callback to the function graph to be run in service, must return
 */
function Core(functions, parameters) {
    if (!parameters) parameters = defaults
    if (!parameters.publisher) parameters.publisher = defaults.publisher
    if (!parameters.subscriber) parameters.subscriber = defaults.subscriber
    if (parameters.publisher) parameters.publisher.name = functions.name + "'s Publisher"
    if (parameters.subscriber) parameters.subscriber.name = functions.name + "'s Subscriber"
    if (parameters.subscriber && !parameters.generator) Subscriber(parameters.subscriber, data => Process(functions, parameters, data))
    if (parameters.generator) setInterval(() => Publisher(parameters.publisher, functions()), parameters.generator)

}

function Process(functions, parameters, data) {
    console.log(data)
    let output = functions(Validator(Parser(data)))
    if (output) Publisher(parameters.publisher, output)
    return output
}

module.exports = { Core }