const { Core } = require('../main')
function core_test(callback) {
    try {
        Core(() => {
            callback(true)
            return 
        }, {key:"tests", generator: true})
    } catch (error) {
        callback(false)
    }
}
core_test(result => console.log("core_test result: ", result))
