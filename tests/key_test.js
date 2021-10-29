const { Core } = require('../main')

function key_test(callback) {
    let result = false
    let expected = "key_test_" + Date.now()
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
    }, { key: "not_test", name:"node_2", namespace:"test", subscribesTo: ['*'] })    
}

key_test(result => console.log("key_test result: ", result))
