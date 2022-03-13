const { Core } = require('../main')
const { equals } = require('../src/utils')
const { run } = require('./utils/run')

const namespace = "generator_interval_test"
const total = 3
const heard = []

let count = 0
let result = false
let expected = []

function prepare() {
    console.log('preparing generator test...')
    do {
        count++
        expected.push(count)
    } while (expected.length < total)
    expected.push('done')

    console.log("expected: ", expected)
}

function generator_listener(data, callback) {
    console.log("Heard: ", data)
    if (typeof data === 'number' || typeof data === 'string') heard.push(data)

    if (data === 'done') {
        result = equals(expected, heard)
        callback(result)
        return heard
    }
}

function generator(data) {
    if(typeof data === 'number') {
        if(data >= total) return new Promise(resolve => setTimeout(() => resolve('done'), 1000))
        if (data < total) {
            let count = data
            count++
            console.log(count)
            return new Promise(resolve => setTimeout(() => resolve(count), 1000))
        }
    }
    
}

function start() {
    return new Promise(resolve => setTimeout(() => resolve(0), 1000))
}


/**
 * Generator Test - Interval
 * 
 * Builds expected messages based on count of messages to send. 
 * Listens for expected messages, compares recieved against expected.
 */
function generator_interval_test(callback) {
    prepare()
    Core(data => generator_listener(data, callback), { listen: namespace })

    Core(generator, { listen: namespace, returns: namespace })

    Core(start, { returns: namespace })
   
}

run(generator_interval_test)
