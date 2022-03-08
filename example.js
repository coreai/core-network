const { Core } = require('./main')

function Generator() {
    let message = "Hello! now: " + Date.now()
    return new Promise(resolve => setTimeout(() => resolve(message), 1000))
}

function Listener(data) {
    // have to process for all possible inputs
    console.log("Heard: ", data)
}

Core(Listener)
Core(Generator)