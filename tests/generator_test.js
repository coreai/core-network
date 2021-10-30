const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "generator_test"

function generator_test(callback) {
    let result = false
    let expected = "generator_test_" + Date.now()
    Core(() => expected, { key: "tests", namespace: namespace, generator: true })
    Core(data => {
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    }, { key: "tests", namespace: namespace, subscribesTo: ['*'] })
}

run(generator_test)
