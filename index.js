/**
 * Load environment variables from file
 */
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}



/**
 * Imports
 */
const db = require('./modules/db')
const server = require('./modules/server')



/**
 * Connect to Database, insert default user and start API server
 */
db.connect()
.then((db) => {
    let collection = db.collection('users');
    collection.countDocuments().then((res) => {
        if (res === 0) {
            collection.insertOne({
                login: 'johndoe',
                password: 'mycrazypassword',
                firstName: 'John',
                lastName: 'Doe'
            }).catch((err) => {
                console.log('[App] Unable to insert default user');
            });
        }
    })
  })
.then(server.start)