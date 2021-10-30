const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "key_test"

function key_test(callback) {
    let result = false
    let expected = "key_test_" + Date.now()
    Core(() => expected, {key: "tests", namespace: namespace, generator: true})
    Core(data => {
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    }, { key: "tests", name:"node_1", namespace: namespace, subscribesTo: ['*'] })
    
    Core(data => {
        if (data === expected) {
            result = false
            callback(result)
            return
        }
    }, { key: "not_test", name:"node_2", namespace: namespace, subscribesTo: ['*'] })    
}

run(key_test)
