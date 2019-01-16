const http = require('http')
const express = require('express')

const app = require('./app')

const PORT = process.env.PORT  || 3001

const server = http.createServer(app);

//set port
server.listen(PORT, () => {
    console.log(`Now the server is up and listening on port ${PORT}...`)
})