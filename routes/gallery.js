/**
 * Load modules
 */

var express = require("express");
var router = express.Router();
const db = require("../modules/db");
//var ObjectID = require("mongodb").ObjectId;


/**
 * Routes
 */

// GET /gallery : provides all gallery documents
router.get("/", function(req, res) {
  db.db
    .collection("gallery")
    .find()
    .toArray()
    .then(all_items => {
      res.json(all_items);
    })
    .catch(err => {
      console.log("Error within /gallery:", err);
    });
});

// DELETE /gallery/:id  : delete a gallery document by id
router.delete('/:id', function(req, res, next) {
	db.db.collection('gallery').findOneAndDelete({_id: new db.ObjectID(req.params.id)}).then((result) => {
		if (result.value) {
			res.json(result.value)
		} else {
			res.status(404).send()
		}
	}).catch((err) => {
		res.status(500).send(err)
	});
});

// POST /gallery : Insert a gallery document
router.post('/', function(req, res, next) {
	db.db.collection('gallery').insertOne(req.body).then((result) => {
		req.body._id = result.insertedId
		res.json(req.body)
	}).catch((err) => {
		res.status(500).send(err)
	});
});

// PUT /gallery/:id : Update a gallery document
router.put('/:id', function(req, res, next) {
	delete req.body._id;
	db.db.collection('gallery').findOneAndUpdate({_id: new db.ObjectID(req.params.id)}, {$set: req.body}, {returnOriginal: false}).then((result) => {
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
