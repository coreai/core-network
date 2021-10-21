const { Core } = require('../main')

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

    console.log("expected: ", expected)
    count = 0

    let publisher = Core(() => {
        if (count >= total) {
            clearInterval(publisher)
            console.log(publisher)
            return 'done'
        }
        if (count < total) count++
        return count
    }, { generator: 1000 })


    let heard = []
    let subscriber = Core(data => {
        console.log("Heard: ", data)
        heard.push(data)
        if(data === 'done') {
            result = equals(expected, heard)
            callback(result)
        }
    })
}

generator_interval_test(result => console.log("generator_interval_test result: ", result))
