/**
 * Load modules
 */

var express = require('express')
var router = express.Router()
const db = require('../modules/db')



/**
 * Routes
 */

// Return a user
router.get('/', function (req, res) {
    db.db.collection('users').findOne().then((user) => {
        res.json(user)
    })
})



/**
 * Exports
 */

module.exports = router