const express = require('express')
const router = express.Router();

var parser = require("ical-parser");
var fs = require('fs');

const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

router.get('/hello', (req, res) => {
    res.send("Hello World! I am a ics parser")
})

const upload = multer({ storage: storage })


router.post('/', upload.single('calendar'), (req, res) => {

    const parseFile = path => {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                console.log(err.stack);
                return;
            }

            parser.convert(data, function (err, parsedResponse) {
                if (err) {
                    console.log("Error occurred parsing ical data", err);
                } else {

                    const cdata = parsedResponse.VCALENDAR[0].VEVENT

                    //res.send(cdata)

                    var data = []

                    for (var i = 0; i < cdata.length; i++) {

                        var r = cdata[i]

                        //Date
                        var year = r["DTSTART;TZID=America/Vancouver"].substring(0, 4);

                        var month = r["DTSTART;TZID=America/Vancouver"].substring(4, 6);

                        var day = r["DTSTART;TZID=America/Vancouver"].substring(6, 8);

                        var date = `${day}/${month}/${year}`

                        //util

                        var year = r.RRULE.substr(26, 4)
                        var month = r.RRULE.substr(30, 2)
                        var day  = r.RRULE.substr(32, 2)
                        var until = `${day}/${month}/${year}`

                        console.log(month)

                        data[i] = {
                            "title": r.SUMMARY,
                            "desc": r.DESCRIPTION.replace(/\\/g, "").replace('.nn', "."),
                            "roomId": r.LOCATION.replace(/\\/g, ""),
                            "startTime": r["DTSTART;TZID=America/Vancouver"].substr(9),
                            "endTime": r["DTEND;TZID=America/Vancouver"].substr(9),
                            "day": r.RRULE.substr(-2),
                            "date": date,
                            "freq": r.RRULE.substr(5, 6),
                            "until": until
                        }
                    }
                    console.log(data)
                    res.json({
                        calendarData: data
                    })
                }
            });

        });
    };

    parseFile(req.file.path)

})

module.exports = router