const express = require("express");
const router = express.Router();

const {
   addNftData,
   getNftsdata,
   getNftsdetails,
   addNftDetails,
} = require("../controllers/nftController.js");

router.route("/add-nft").post(addNftData);
router.route("/listing").get(getNftsdata);
router.route("/:contractAddress/:name").get(getNftsdetails);
router.route("/add-nft-details").post(addNftDetails);
module.exports = router;
