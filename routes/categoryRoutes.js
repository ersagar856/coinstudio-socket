const express = require("express");
const router = express.Router();
const {
    addCategory,
    getAllCategory,
} = require("../controllers/categoryController.js");

router.route("/add-category").post(addCategory);
router.route("/get-category").get(getAllCategory);
module.exports = router;
