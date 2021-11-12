const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "subscribe_test"

function node(data, passes, callback) {
    if (data === passes) return 'done'
    if (data === 'done') {
        callback(true)
        return 
    }
    if (typeof data === 'number') data++
    return data
}

/**
 * run two nodes that pass data in a circular pattern, changing and validating
 * 
 * test succeeds when nodes successfully increase the count to equal the number of passes
 * 
 *  node_1 --> node_2 --> node_1 --> node_2 --> ...
 * 
 * TODO: seems to periodically fail, probably from lost message, though this is normal in a pub-sub system
 */
function subscribe_test(callback) {
    let passes = 4
    Core(data => node(data, passes, callback), { name: "node_1", key: "tests", namespace: namespace, broadcasts: ['node_1_output'], subscribesTo: ['core_test_generator_output', 'node_2_output'] })
    Core(data => node(data, passes, callback), { name: "node_2", key: "tests", namespace: namespace, broadcasts: ['node_2_output'], subscribesTo: ['node_1_output'] })
    Core(() => 0, { name: "core_test_generator", key: "tests", namespace: namespace, broadcasts: ['core_test_generator_output'], generator: 1000 })
}

run(subscribe_test)