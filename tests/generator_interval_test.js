const { Core } = require('../main')
const { equals } = require('../src/utils')
const { run } = require('./utils/run')

const namespace = "generator_interval_test"


function generator(count) { 
    let publisher = setInterval(() => {
        {
            if (count >= total) {
                clearInterval(publisher)
                return 'done'
            }
            if (count < total) count++
            return count
        }
    }, 1000)
}

/**
 * Generator Test - Interval
 * 
 * Builds expected messages based on count of messages to send. 
 * Listens for expected messages, compares recieved against expected.
 */
function generator_interval_test(callback) {
    let count = 0
    let total = 3

    let result = false
    let expected = []
    console.log('preparing generator test...')
    do {
        count++
        expected.push(count)
    } while (expected.length < total)
    expected.push('done')

    console.log("expected: ", expected)
    count = 0

    Core(() => generator(count))

    let heard = []
    Core(data => {
        console.log("Heard: ", data)
        if(typeof data === 'number' || typeof data === 'string') heard.push(data)
        
        if(data === 'done') {
            result = equals(expected, heard)
            callback(result)
            return heard
        }
    })
}

run(generator_interval_test)
