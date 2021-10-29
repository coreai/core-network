const { Core } = require('../main')
const { run } = require('./utils/run')

function namespace_test(callback) {
    let result = false
    let expected = "namespace_test_" + Date.now()
    Core(() => expected, {key: "tests", namespace:"test", generator: true})
    Core(data => {
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    }, { key: "tests", name:"node_1", namespace:"test", subscribesTo: ['*'] })
    
    Core(data => {
        if (data === expected) {
            result = false
            callback(result)
            return
        }
    }, { key: "tests", name:"node_2", namespace:"not_test", subscribesTo: ['*'] })    
}

run(namespace_test)
