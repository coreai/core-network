# Core Network
A framework for quickly implementing core network protocols.

## Goal
Be able to load this framework and start building a service network.

- load as npm package
- import core

## API
Core(functions, parameters)

## Parameters
    subscriber: function - listens for data in channel(s)
        name: string - gives the subscriber side a name for logging
        namespace: string - creates or adds a named segement of the network
        key: string - creates or adds a keyed segement of the network 
        subscribesTo: array:string - names of channels to subscribe to

    publisher: function - outputs data onto a channel 
        name: string - gives the subscriber side a name for logging
        namespace: string - creates or adds a named segement of the network
        key: string - creates or adds a keyed segement of the network 
        broadcasts: array:string - names of channels to broadcast on

    logging : boolean 

    generator : number | boolean - runs a node without a subscriber
        true --> runs functions once
        number --> runs at an interval.

    

}

## Quickstart
```
const { Core } = require('core-network')

function testGenerator() {
    return "Hello! now: " + Date.now()
}

function testListener(data) {
    // have to process for all possible inputs
    console.log("Heard: ", data)
}

Core(testListener)
Core(testGenerator, { generator: 1000 })

```


## Dependencies
- http://cote.js.org/ --> for mesh network prototyping