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
    Core(() => new Promise(resolve => setTimeout(() => resolve(expected), 1000)), namespace)
    
    Core(data => {
        console.log(data)
        if (data === expected) {
            result[0] = true
            return true
        }
    }, {listen: namespace})

    Core(data => {
        console.log(data)
        if (data === expected) {
            result[1] = true
            return true
        }
    }, {listen: namespace})

    Core(data => {
        if (finished === true) return
        if (result[0] === true && result[1] === true) {
            finished = true
            callback(true)
        }

    }, {listen: namespace})
}

run(broadcast_multi_test)
