/**
 * Load modules
 */

const express = require('express')
const usersRouter = require('../routes/users')


/**
 * Variables
 */

// Global variables
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT
const app = express()



/**
 * Configuration
 */

// Configure routes
app.use('/users', usersRouter)

// Start server
var start = function (callback) {
    app.listen(port, host, () => {
        console.info(`[Server] Listening on http://${host}:${port}`)
        if (callback) callback(null)
    })
};



/**
 * Exports
 */
exports.start = start