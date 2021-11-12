const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "broadcast_test"

function node(data, passes, name) {
    if (data === passes) return {status: 'done', name}
    if (data.status === 'done') return 
    if (typeof data === 'number') data++
    return data
}

function broadcast_test(callback) {
    let passes = 4
    let node_1 = false
    let node_2 = false
    Core(data => node(data, passes, "node_1"), { name: "node_1", key: "tests", namespace: namespace, subscribesTo: ['test_channel'], broadcasts: ['test_channel'], logging: false})
    Core(data => node(data, passes, "node_2"), { name: "node_2", key: "tests", namespace: namespace, subscribesTo: ['test_channel'], broadcasts: ['test_channel'], logging: false})
    Core(() => 0, { name: "generator", key: "tests", namespace: namespace, generator: 1000, broadcasts: ['test_channel'], logging: false})
    Core(data => {
        if(node_1 === true && node_2 === true) return 
        if(data.status === 'done') {
            if(data.name === 'node_1') node_1 = true
            if(data.name === 'node_2') node_2 = true
            if(node_1 === true && node_2 === true) callback(true)
        }
        
    }, { name: "node_3", key: "tests", namespace: namespace, subscribesTo: ['test_channel'], logging: false})

}

run(broadcast_test)