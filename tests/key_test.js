const { Core } = require('../main')
const { run } = require('./utils/run')

const namespace = "key_test"
const expected = namespace + Date.now()

function start() {
    return new Promise(resolve => setTimeout(() => resolve(expected), 1000))
}


function key_test(callback) {
    let result = false
    Core(start)
    Core(data => {
        if (data === expected) {
            result = true
            callback(result)
            return
        }
    })
    
    Core(data => {
        if (data === expected) {
            result = false
            callback(result)
            return
        }
    })    
}

run(key_test)
