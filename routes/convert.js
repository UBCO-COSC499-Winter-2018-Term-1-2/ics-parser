const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.send("The server has been set up and it works")
})

module.exports = router