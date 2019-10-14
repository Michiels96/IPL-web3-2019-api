/**
 * Imports
 */
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient



/**
 * Variables
 */
// Connection URL
const url = process.env.MONGODB_URI
// Database Name
const dbName = process.env.DB_DB



/**
 * Connect to the database
 */
let connect = () => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true })
        client.connect(function(err) {
            if (err) {
                console.error("[Db] Unable to connect to server: " + err.message)
                reject(err)
            } else {
                console.info("[Db] Connected successfully to server")
                exports.db = client.db(dbName)
                resolve(exports.db)
            }
        });
    });
};



/**
 * Exports
 */
exports.connect = connect
exports.db = null // db will be set after connected
exports.ObjectID = mongodb.ObjectID;