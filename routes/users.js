/**
 * Load modules
 */

var express = require('express')
var router = express.Router()



/**
 * Routes
 */

// Return a user
router.get('/', function (req, res) {
    res.json({
        firstName: 'John',
        lastName: 'Doe',
    });
})



/**
 * Exports
 */

module.exports = router