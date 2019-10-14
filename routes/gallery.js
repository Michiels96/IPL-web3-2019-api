/**
 * Load modules
 */

var express = require("express");
var router = express.Router();
const db = require("../modules/db");
var ObjectID = require("mongodb").ObjectId;


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

/**
 * Exports
 */

module.exports = router;
