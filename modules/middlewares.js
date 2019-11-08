/**
 * Load modules
 */
const jwt = require('jsonwebtoken')
const db = require('./db')



/**
 * Variables
 */
const jwtSecret = process.env.JWT_SECRET



/**
 * Logger
 */
const loggerMiddleware = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
}



/**
 * Authentication
 */
 // Create an authorization middleware to be used on the route to be secured
const authMiddleware = (req, res, next) => {
    var token = req.get('authorization')
    if (!token) {          
        res.status(401).json({ success: false, error: "A token is mandatory to subscribe to this API." })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {              
                res.status(401).json({ success: false, error: "Unable to parse token." })
            } else if (decoded.exp <= Date.now()) {              
                res.status(401).json({ success: false, error: "Token has expired." })
            } else {
                db.db
                .collection("users")
                .findOne({ _id: new db.ObjectID(decoded.user) })
                .then(user => {
                    if (err || !user) {
                        res.status(500).send(err)
                    } else {
                        delete user.password
                        req.user = user
                        req.token = decoded
                        next()
                    }
                })
            }
        })
    }
}



/**
 * Exports
 */
exports.authMiddleware = authMiddleware
exports.loggerMiddleware = loggerMiddleware