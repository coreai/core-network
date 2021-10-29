const { Core } = require('../main')
const { run } = require('./utils/run')

/**
 * Tests the name parameter and basic instantiation of publisher and subscriber components in a node
 * 
 * TODO: test nodes with same name --> expected to overwrite existing node
 * @param {*} callback 
 */
function name_test(callback) {
    let result = false
    let expected = "test_name"
    Core(data => {
        if(typeof data === "object" && data.advertisement && data.advertisement.name === expected+"_publisher") {
            result = true
            callback(result)
        }
        return
    }, { name: expected, key: "tests", subscribesTo: ['*'] })
}

run(name_test)
