const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "async_test"

function tester (data) {
    return new Promise(resolve => setTimeout(() => {
        data++
        resolve(data)
    }, 1000))
}

async function node(data, passes, callback) {
    console.log(data)
    if (data === passes) return 'done'
    if (data === 'done') {
        callback(true)
        return 
    }
    if(typeof data === 'number') {
        let count = await tester(data)
        return count
    }
   
}

function async_test(callback) {
    let passes = 4
    Core(data => node(data, passes, callback), { name: "node_1", key: "tests", namespace: namespace , subscribesTo: ['core_test_generator_output', 'node_2_output'] })
    Core(data => node(data, passes, callback), { name: "node_2", key: "tests", namespace: namespace, subscribesTo: ['node_1_output'] })
    setTimeout(() => Core(() => 0, { name: "core_test_generator", key: "tests", namespace: namespace, generator: true }), 2000)
}

run(async_test)