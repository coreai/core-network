const { Core } = require('../main')
const { run } = require('./utils/run')

function core_test(callback) {
    try {
        Core(() => {
            callback(true)
            return
        })
    } catch (error) {
        callback(false)
    }
}


run(core_test)
