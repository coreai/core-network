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
    Core(data => node(data, passes, "node_1"), namespace)
    Core(data => node(data, passes, "node_2"), namespace)
    Core(start, namespace)
    Core(data => {
        if (typeof data === 'object' && data.status === 'done') {
            callback(true)
        }
    }, namespace)

}

run(broadcast_test)