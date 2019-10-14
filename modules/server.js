/**
 * Load modules
 */

const express = require('express')
const usersRouter = require('../routes/users')
const galleryRouter = require('../routes/gallery')



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

// Configure routes
app.use('/users', usersRouter)
app.use('/gallery', galleryRouter)

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