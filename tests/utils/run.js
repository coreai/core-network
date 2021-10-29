function run(test) {
    process.on('message', message => {
        if (message === 'START') {
            process.send(`Starting : ${test.name}`)
            test(result => {
                // console.log(test.name, result)
                // let report = `Result : ${test.name} | ${result}`
                let report = { name: test.name, result }
                process.send(report)
                process.exit()
            })
            if (message === 'END') {
                process.send(`Ending : ${test.name}`)
                process.exit()
            }
        }
    })

}
module.exports = { run }