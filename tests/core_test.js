const { Core } = require('../main')
const { run } = require('./utils/run')
function core_test(callback) {
    try {
        Core(() => {
            callback(true)
            return
        }, { key: "tests", namespace:"core_test", generator: true })
    } catch (error) {
        callback(false)
    }
}


run(core_test)
