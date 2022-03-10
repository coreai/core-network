# Core Network
A framework for quickly implementing core network protocols.

## Goal
Be able to load this framework and start building a service network.

- load as npm package
- import core

## API
Core converts a function's inputs and outputs into network messages. 

```
Core(function, group)
```

`group` - the channel the Core function broadcasts to, like namespacing [default = "core"]

## Example
```
const { Core } = require('coreai-network')

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

```


## Dependencies
- https://interpretor.github.io/zyre.js/ --> for mesh network prototyping