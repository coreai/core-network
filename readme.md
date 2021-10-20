# Core Network


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

    generator : number - does not instantiate a subscriber, only a publisher that runs functions at a given interval

    

}

## Example
The following is a test example:
```
const { Core } = require('core-network')

function FunctionsToRun () {
    return 'Hello!'
}

Core (FunctionsToRun)
```




## Dependencies
- http://cote.js.org/ --> for mesh network prototyping