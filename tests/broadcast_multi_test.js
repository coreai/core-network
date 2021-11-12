const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "broadcast_multi_test"

/**
 * NOTE: this will fail since multi channel broadcast is not implmented.
 * @param {*} callback 
 */
function broadcast_multi_test(callback) {
    let result = [false, false]
    const expected = "broadcast_multi_test_" + Date.now()
    let finished = false
    Core(() => expected, { key: "tests", namespace: namespace, broadcasts: ['test_channel', 'test_channel_2'], generator: 1000 })
    Core(data => {
        console.log(data)
        if (data === expected) {
            result[0] = true
            return true
        }
    }, { key: "tests", namespace: namespace, name: "node_1", subscribesTo: ['test_channel'], broadcasts: ['node_1'] })

    Core(data => {
        console.log(data)
        if (data === expected) {
            result[1] = true
            return true
        }
    }, { key: "tests", namespace: namespace, name: "node_2", subscribesTo: ['test_channel_2'], broadcasts: ['node_2'] })

    Core(data => {
        if (finished === true) return
        if (result[0] === true && result[1] === true) {
            finished = true
            callback(true)
        }

    }, { key: "tests", namespace: namespace, name: "node_3", subscribesTo: ['node_1', 'node_2'] })
}

run(broadcast_multi_test)
