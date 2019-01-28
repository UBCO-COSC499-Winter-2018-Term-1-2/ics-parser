const fs = require('fs')

const dataFile = "ical.ics"

let data = fs.readFileSync(dataFile, 'utf8')

console.log(data)