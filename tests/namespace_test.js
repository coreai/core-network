const { Core } = require('../main')
const { run } = require('./utils/run')

const key = "namespace_tests"
const expected = "namespace_test_" + Date.now()

function start() {
    return new Promise(resolve => setTimeout(() => resolve(expected), 2000))    
}

function namespace_test(callback) {
    let result = false
    
    Core(start, key)
    Core(data => {
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    },key)
    
    Core(data => {
        if (data === expected) {
            result = false
            callback(result)
            return
        }
    })    
}

run(namespace_test)
