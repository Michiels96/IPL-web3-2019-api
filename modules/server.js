/**
 * Load modules
 */

const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middlewares').authMiddleware
const loggerMiddleware = require('./middlewares').loggerMiddleware
const authRouter = require('../routes/auth')
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

app.use(loggerMiddleware)

// limit : it controls the maximum request body size. 
app.use(bodyParser.json({limit:"1.1MB"}));

// Configure routes
app.use(authRouter)
// Secure the API
app.use(authMiddleware)
// Other routes
app.use('/users', usersRouter)
app.use('/gallery', galleryRouter)
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