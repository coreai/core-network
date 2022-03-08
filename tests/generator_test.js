const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "generator_test"
const expected = "generator_test_" + Date.now()

function start() {
    return new Promise(resolve => setTimeout(() => resolve(expected), 2000))    
}

function generator_test(callback) {
    let result = false
    Core(() => start(), { key: "tests", namespace: namespace, generator: true })
    Core(data => {
        console.log(data)
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    })
}

run(generator_test)
