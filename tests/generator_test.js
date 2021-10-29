const { Core } = require('../main')
const { run } = require('./utils/run')

function generator_test(callback) {
    let result = false
    let expected = "generator_test_" + Date.now()
    Core(() => expected, { key: "tests", generator: true })
    Core(data => {
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    }, { key: "tests", subscribesTo: ['*'] })
}

run(generator_test)
