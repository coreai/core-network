const { Core } = require('../main')

/**
 * Test parameterization
 * 
 * `name` : broadcast name, if broadcasted name = parameters name
 * 
 * `namespace` : start generator in one namespace -> start subscriber in another namespace
 * 
 * `key` : start generator in one key -> start subscriber in another key
 * 
 * `subscribesTo` : start generator that broadcasts to test channels, subscribe to each, broadcast result
 * 
 * `broadcasts` : start node that broadcasts to test channels, listen for result
 * 
 * `generator` : start generator node, listen for result, interval also
 */
function parameterize_test() {
    Core(data => console.log(data))
}
