/**
 * Load modules
 */

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const _ =  require('lodash')
const bcrypt = require('bcrypt')
const db = require('../modules/db')



/**
 * Variables
 */

const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10
// To use it in Production, don't forget to set-up a new environment variable
const jwtSecret = process.env.JWT_SECRET



/**
 * Routes
 */

router.post("/login", function(req, res, next) {
    db.db.collection("users").findOne({ login: req.body.login }).then(user => {      
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    const exp = Date.now() + 12 * 60 * 60 * 1000; // 12h
                    jwt.sign({ user: user._id, exp: exp }, jwtSecret, (err, token) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ success: false, error: "error during token signing" })
                        } else {
                            delete user.password
                            res.json({ success: true, user, token })
                        }
                    });         
                } else {
                    res.status(401).json({ success: false, error: "bad email/password" })
                }
            })
        } else {
            res.status(401).json({ success: false, error: "bad email/password" })
        }
    })
})

router.post("/register", function(req, res, next) {
    // Check mandatory data
    if (!req.body.login || !req.body.password) {
        res.status(412).json({ success: false, error: "Password and login needed" })
        return
    }
    // Check if user already into DB
    db.db.collection("users").findOne({ login: req.body.login }).then(user => {      
        if (user) {
            res.status(409).json({ success: false, error: "login already taken" })
        } else {
            // Hash password
            const user = _.cloneDeep(req.body)
            bcrypt.hash(user.password, saltRounds, function(err, hash) {
                if (err) {
                    res.status(500).json({ success: false, error: "Unable to hash password" })
                } else {
                    user.password = hash
                    // Insert user into DB
                    db.db.collection("users").insertOne(user).then(result => {
                        user._id = result.insertedId
                        delete user.password
                        res.json(user);
                    }).catch(err => {
                        res.status(500).json({ success: false, error: "Unable to insert user into DB" })
                    })
                }
            });
        }
    })
})



/**
 * Exports
 */

module.exports = router;
