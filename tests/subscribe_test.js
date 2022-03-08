const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "subscribe_test"

function start() {
    return new Promise(resolve => setTimeout(() => resolve(0), 1000))    
}

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
    Core(data => node(data, passes, callback))
    Core(data => node(data, passes, callback))
    Core(start)
}

run(subscribe_test)