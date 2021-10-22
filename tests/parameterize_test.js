const { Core } = require('../main')

/**
 * Test parameterization
 * 
 * try with no parameters
 * try with each parameter
 */
function parameterize_test() {
    Core(data => console.log(data))
}
