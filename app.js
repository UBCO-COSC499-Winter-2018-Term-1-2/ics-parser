const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const convertRoute = require('./routes/convert')

app.use('/convert', convertRoute)

module.exports = app;