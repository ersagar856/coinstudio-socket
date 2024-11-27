const express = require("express");
const router = express.Router();
const {
     addPlatform,
     getAllPlatform,
} = require("../controllers/platformController.js");

router.route("/add-platform").post(addPlatform);
router.route("/get-platform").get(getAllPlatform);
module.exports = router;
