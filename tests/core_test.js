const { Core } = require('../main')

function node(data, passes) {
    let count
    let result = false
    if (count === passes) return 'done'
    if (data === 'done') return null
    if (typeof data === 'number') {
        if (typeof count !== 'number') count = data
        if (data === count + 1) result = true
        count++
    }
    return count
}


/**
 * run two nodes that pass data in a circular pattern, changing and validating on each pass
 * 
 *  node_1 --> node_2 --> node_1 --> node_2 --> ...
 */
let passes = 4
Core(data => node(data, passes), { name: "node_1", subscribesTo: ['core_test_generator_output', 'node_2_output'] })
Core(data => node(data, passes), { name: "node_2", subscribesTo: ['node_1_output'] })
setTimeout (() => Core(() => 0, { name: "core_test_generator", generator: true }), 1000)
