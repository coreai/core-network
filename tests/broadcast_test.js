const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "broadcast_test"

function start() {
    return new Promise(resolve => setTimeout(() => resolve(0), 1000))
}

function node(data, passes, name) {
    console.log(typeof data, data, passes, name)
    if (data === passes) return { status: 'done', name }
    if (typeof data === 'object' && data.status === 'done') return
    if (typeof data === 'number') data++
    return data
}

function broadcast_test(callback) {
    let passes = 4
    Core(data => node(data, passes, "node_1"), {listen: namespace})
    Core(data => node(data, passes, "node_2"), {listen: namespace})
    Core(start, {returns: namespace})
    Core(data => {
        if (typeof data === 'object' && data.status === 'done') {
            callback(true)
        }
    }, {listen: namespace})

}

run(broadcast_test)