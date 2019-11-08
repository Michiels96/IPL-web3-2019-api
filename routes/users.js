/**
 * Load modules
 */

const express = require('express')
const router = express.Router()
const db = require('../modules/db')



/**
 * Routes
 */

// Return a user
router.get("/", function(req, res) {
  	db.db.collection("users").findOne().then(user => {
		delete user.password
		res.json(user)
	})
})

router.post("/me", function(req, res, next) {
    res.json(req.user)
})



/**
 * Exports
 */

module.exports = router
