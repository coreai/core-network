const { Core } = require('../main')

function node_1(callback) {
    Core(data => {
        let expected = "core_test_" + Date.now()
        if(data === expected) result = true
        callback(result)
    })
}


function node_2(callback) {
    Core(data => {
        let expected = "core_test_" + Date.now()
        if(data === expected) result = true
        callback(result)
    })
}

/**
 * run two nodes that pass data in a circular pattern, changing and validating on each pass
 * 
 *  node_1 --> node_2 --> node_1 --> node_2 --> ...
 */
function core_test () {
    let result = false
    let passes = 4
    
}