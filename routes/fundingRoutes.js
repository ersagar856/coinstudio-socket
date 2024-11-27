const express = require("express");
const router = express.Router();
const {
  addFundingRound,
  getFundingRound,
} = require("../controllers/fundingController.js");

router.route("/add-funding-round").post(addFundingRound);
router.route("/get-funding-round").get(getFundingRound);

module.exports = router;
