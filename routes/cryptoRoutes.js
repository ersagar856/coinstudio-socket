const express = require("express");
const router = express.Router();
const {
    addCrypto,
    getCrypto,
    getCryptoBySlug,
    getCryptoByTags
} = require("../controllers/cryptoController.js");

router.route("/add-crypto").post(addCrypto);
router.route("/listing").get(getCrypto);
router.route("/getdetails/:slug").get(getCryptoBySlug);
router.route("/view/:slug").get(getCryptoByTags);
module.exports = router;