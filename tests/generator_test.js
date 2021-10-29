const { Core } = require('../main')

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

generator_test(result => console.log("generator_test result: ", result))
