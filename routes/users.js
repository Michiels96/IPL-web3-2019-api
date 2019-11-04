/**
 * Load modules
 */

const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const jwt = require("jsonwebtoken");



/**
 * Routes
 */

// Return a user
router.get("/", function(req, res) {
  db.db
    .collection("users")
    .findOne()
    .then(user => {
      res.json(user);
    });
});

// To use it in Production, don't forget to set-up a new environment variable
const jwtSecret = process.env.JWT_SECRET;

router.post("/me", function(req, res, next) {
  db.db
    .collection("users")
    .findOne({ login: req.body.username })
    .then(user => {      
      if (user) {
        //compare password. Improve this later with hashed password!
        if(user.password === req.body.password)
          {          
          const exp = Date.now() + 12 * 60 * 60 * 1000; // 12h
          jwt.sign({ user: user._id, exp: exp }, jwtSecret, (err, token) => {
            if (err) {
              console.log("Error at sign()",err);
              res.json({ success: false, error: "error during token signing" });
            } else {              
              res.json({ success: true, user: user,token:token });
            }
          });         
          }
        else{
          console.log("bad password");
          res.json({ success: false, error: "bad email/password" });
        }
     
      } else {
        console.log("no user");
        res.json({ success: false, error: "bad email/password" });
      }
    });
});


/**
 * Exports
 */

module.exports = router;
