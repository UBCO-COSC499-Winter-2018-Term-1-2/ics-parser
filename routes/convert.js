const express = require('express')
const router = express.Router();
const ical = require('ical')

var ical2json = require("ical2json");

var parser = require("ical-parser");
var fs = require('fs');



// import icsToJson from 'ics-to-json'


router.get('/parse', (req, res) => {

    // const fileLocation = require('../files/david_cal.ics')

    // var data = ical.parseFile('david_cal.ics')

    //const url = "https://calendar.google.com/calendar/ical/osahonnn%40gmail.com/public/basic.ics"

    const url = "localhost:3001/ical.ics"

    const cal = 'data.txt'

    const parseFile = path => {
        fs.readFile(__dirname + path, "utf8", (err, data) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            //console.log(data.toString());

            parser.convert(data, function (err, parsedResponse) {
                if (err) {
                    console.log("Error occurred parsing ical data", err);
                } else {
                    //console.log(parsedResponse)

                    res.json(parsedResponse)
                    //parsedResponse is the parsed javascript JSON object
                }
            });

        });

        console.log("Program Ended");
    };

    //parseFile('/ical.ics');

    parseFile(url)

    // fs.readFile(cal, 'ut8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(data.toString())
    //     }
    // })

    //res.send(contents)

    // parser.convert(contents, function(err, parsedResponse) {
    //     if(err) {
    //         console.log("Error occurred parsing ical data", err);
    //     }	else {
    //         res.send(parsedResponse)
    //         //parsedResponse is the parsed javascript JSON object
    //     }
    // });


    // var data = ical.parseFile("david_cal.ics", function (err, data) {
    //     if (err) console.log(err);
    //     console.log(data);
    // });

    // res.send(data)

    // ical.fromURL(url, {}, function (err, data) {
    //     // if (err) {
    //     //     res.send(err)
    //     // } else {
    //     //     res.json(data)
    //     // }

    //     res.json({ data,err })
    // })

})




module.exports = router