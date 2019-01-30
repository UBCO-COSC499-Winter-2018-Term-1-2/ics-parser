const express = require('express')
const router = express.Router();
const ical = require('ical')

var ical2json = require("ical2json");

var parser = require("ical-parser");
var fs = require('fs');

var formidable = require('formidable');

const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({ storage: storage })



// import icsToJson from 'ics-to-json'


router.post('/parse', upload.single('calendar'), (req, res) => {

    const parseFile = path => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                console.log(err.stack);
                return;
            }
            //console.log(data.toString());

            parser.convert(data, function (err, parsedResponse) {
                if (err) {
                    console.log("Error occurred parsing ical data", err);
                } else {

                    const cdata = parsedResponse.VCALENDAR[0].VEVENT

                    var data = []

                    for (var i = 0; i < cdata.length; i++) {

                        var r = cdata[i]

                        data[i] = {
                            "title": r.SUMMARY,
                            "desc": r.DESCRIPTION.replace(/\\/g, "").replace('.nn', "."),
                            "roomId": r.LOCATION.replace(/\\/g, ""),
                            "startTime": r["DTSTART;TZID=America/Vancouver"].substr(9),
                            "endTime": r["DTEND;TZID=America/Vancouver"].substr(9),
                        }

                    }

                    res.json(data)

                }
            });

        });
    };

    parseFile(req.file.path)

})

module.exports = router