const { Core } = require('./main')

function testGenerator() {
    return "Hello! now: " + Date.now()
}

function testListener(data) {
    // have to process for all possible inputs
    console.log("Heard: ", data)
}
Core(testListener)
Core(testGenerator, { generator: 1000 })
