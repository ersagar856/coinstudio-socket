const express = require("express");
const router = express.Router();

const {
   addFreedGreed,
   addTodayInsights,
   addOurRating,
   addTrending,
   addAirDrop,
   addInsights,
   getHomeDetails,
} = require("../controllers/homeController.js");

router.route("/add-freed-greed").post(addFreedGreed);
router.route("/today-insights").post(addTodayInsights);
router.route("/our-rating").post(addOurRating);
router.route("/our-trending").post(addTrending);
router.route("/air-drop").post(addAirDrop);
router.route("/air-insights").post(addInsights);
router.route("/get-home").get(getHomeDetails);
module.exports = router;
