const { Core } = require('./main')

// function testGenerator() {
//     return "Hello! now: " + Date.now()
// }

// function testListener(data) {
//     // have to process for all possible inputs
//     console.log("Heard: ", data)
// }

// Core(testListener)
// // Core(testGenerator, { generator: 1000 })
// Core(testGenerator, { generator: true })

const equals = (a, b) =>
  a.length === b.length &&
  a.every((v, i) => v === b[i])

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

    console.log("expects: ", expected)
    count = 0

    let heard = []
    let subscriber = Core(data => {
        console.log("Heard: ", data)
        heard.push(data)
        if(data === 'done') {
            result = equals(expected, heard)
            callback(result)
        }
    }, {name: "test_subscriber", logging: true})

    let publisher = Core(() => {
        if (count >= total) {
            clearInterval(publisher)
            return 'done'
        }
        if (count < total) count++
        return count
    }, { name: "test publisher", broadcasts: [ 'test_input_channel' ], generator: 1000, logging: true})
}

generator_interval_test(result => console.log("generator_interval_test result: ", result))
