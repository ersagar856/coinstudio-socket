const express = require("express");
const router = express.Router();
const {
     addAlgorithm,
     getAllAlgorithm,
} = require("../controllers/algorithmController.js");

router.route("/add-algorithm").post(addAlgorithm);
router.route("/get-algorithm").get(getAllAlgorithm);
module.exports = router;
