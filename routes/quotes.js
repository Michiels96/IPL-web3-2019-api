/**
 * Load modules
 */

const express = require('express')
const router = express.Router()
const db = require('../modules/db')



/**
 * Routes
 */

// Find all quotes
router.get('/', function(req, res, next) {
	db.db.collection('quotes').find().toArray().then((quotes) => {
		res.json(quotes)
	}).catch((err) => {
		res.status(500).send(err)
	});
});

// Find a quote by id
router.get('/:id', function(req, res, next) {
	db.db.collection('quotes').findOne({_id: new db.ObjectID(req.params.id)}).then((quote) => {
		if (quote) {
			res.json(quote)
		} else {
			res.status(404).send()
		}
	}).catch((err) => {
		res.status(500).send(err)
	});
});

// Delete a quote by id
router.delete('/:id', function(req, res, next) {
	db.db.collection('quotes').findOneAndDelete({_id: new db.ObjectID(req.params.id)}).then((result) => {
		if (result.value) {
			res.json(result.value)
		} else {
			res.status(404).send()
		}
	}).catch((err) => {
		res.status(500).send(err)
	});
});

// Insert a quote
router.post('/', function(req, res, next) {
	db.db.collection('quotes').insertOne(req.body).then((result) => {
		req.body._id = result.insertedId
		res.json(req.body)
	}).catch((err) => {
		res.status(500).send(err)
	});
});

// Update a quote
router.put('/:id', function(req, res, next) {
	delete req.body._id;
	db.db.collection('quotes').findOneAndUpdate({_id: new db.ObjectID(req.params.id)}, {$set: req.body}, {returnOriginal: false}).then((result) => {
		if (result.value) {
			res.json(result.value)
		} else {
			res.status(404).send()
		}
	}).catch((err) => {
		res.status(500).send(err)
	});
});



/**
 * Exports
 */

module.exports = router;
