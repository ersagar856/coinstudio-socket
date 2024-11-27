const express = require("express");
const router = express.Router();
const {
    addIndustry,
    getAllIndustry,
} = require("../controllers/industryController.js");

router.route("/add-industry").post(addIndustry);
router.route("/get-industry").get(getAllIndustry);
module.exports = router;
