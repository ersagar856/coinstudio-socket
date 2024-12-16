const express = require("express");
const router = express.Router();
const {
   getTrendingCurrency,
   searchCoinNFtExchange,
} = require("../controllers/searchController.js");

router.route("/trending-currencies").get(getTrendingCurrency);
router.route("/search-coin-details").get(searchCoinNFtExchange);
module.exports = router;
