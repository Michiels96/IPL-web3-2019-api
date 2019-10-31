/**
 * Load modules
 */

const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('../routes/users')
const galleryRouter = require('../routes/gallery')

const quotesRouter = require('../routes/quotes')


/**
 * Variables
 */

// Global variables
const host = process.env.SERVER_HOST
const port = process.env.PORT
const app = express()



/**
 * Configuration
 */

// Configure server

// limit : it controls the maximum request body size. 
app.use(bodyParser.json({limit:"1.1MB"}));

// Create an authorization middleware to be used on the route to be secured
var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    var token = req.get('authorization');
      if (!token) {          
          return res.json({ success: false, error: "A token is mandatory to subscribe to this API." });
      }
      jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {              
              return res.json({ success: false, error: "Unable to parse token." });
          }
          if (decoded.exp <= Date.now()) {              
              return res.json({ success: false, error: "Token has expired." });
          }
      req.token = decoded;
      next();
      });
  }


// Configure routes
app.use('/users', usersRouter)
// Secure the Gallery API
app.use('/gallery',authMiddleware, galleryRouter)
app.use('/quotes', quotesRouter)

// Start server
var start = function (callback) {
    app.listen(port,  () => {
        //console.info(`[Server] Listening on http://${host}:${port}`);
        console.info(`[Server] Listening on ${port}`)
        if (callback) callback(null)
    })
};



/**
 * Exports
 */
exports.start = start