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
    parameters.subscriber.channels.map(channel => check(channel, functions, run))
}

/**
 * Check if arguments are runnable
 * @param {string} channel 
 * @param {function} functions 
 * @param {*} next - function to call after this is done
 */
function check(channel, functions, next) {
    if(!channel) Publisher.publish(parameters.publisher.broadcasts, parameters.publisher.name + ': No Channel')
    if(!functions) Publisher.publish(parameters.publisher.broadcasts, parameters.publisher.name + ': No Functions')
    if(!next) Publisher.publish(parameters.publisher.broadcasts, parameters.publisher.name + ': No Runner')
    else next(channel, functions)
}

/**
 * 
 * @param {string} channel 
 * @param {function} functions 
 */
function run(channel, functions) {
    Subscriber.on(channel, data => {
        let parsed_data = Parser(data)
        let validated_data = Validator(parsed_data)
        let returned_data
        if (validated_data) returned_data = functions(validated_data)
        if (returned_data) Publisher.publish(parameters.publisher.broadcasts, returned_data)
    })
}


module.exports = { Core }