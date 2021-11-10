function run(test) {
    if (process.send) process.send(`Starting : ${test.name}`)
    let timer = setTimeout(() => {
        process.send ? process.send({ name: test.name, result: false, reason:'Timeout' }) : console.log({name: test.name, result: false, reason:'Timeout'})
        process.exit()
    }, 20000)

    test(result => {
        let report = { name: test.name, result, reason: 'Internal' }
        process.send ? process.send(report) : console.log(report)
        process.exit()
    })
    process.on('message', message => {
        if (message === 'END') {
            process.send(`Ending : ${test.name}`)
            process.exit()
        }
    })
}
module.exports = { run }