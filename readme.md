# Core Network


## Goal
Be able to load this framework and start building a service network.

- load as npm package
- import core

## API
core(functions, parameters)

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