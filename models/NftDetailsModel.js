const mongoose = require("mongoose");

const nftdetailsSchema = new mongoose.Schema({
   nftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nft",
      required: true,
   },
   items: [
      {
         platformId: {
            type: Number,
         },
         contract: {
            type: String,
         },
         tokenId: {
            type: String,
         },
         tokenIdHex: {
            type: String,
         },
         nftName: {
            type: String,
         },
         nftImage: {
            type: String,
         },
         imageType: {
            type: String,
         },
         rarityRank: {
            type: Number,
         },
         owner: {
            type: String,
            default: "",
         },
         lastTradePrice: {
            type: Number,
            default: 0,
         },
         lastTradeSymbol: {
            type: String,
            default: "",
         },
         lastTradeTime: {
            type: Date, // Changed to Date type
         },
         searchSort: {
            type: [String],
            default: [],
         },
      },
   ],
   activities: [
      {
         txUniqueSeq: {
            type: String,
         },
         hash: {
            type: String,
         },
         platformId: {
            type: Number,
         },
         contract: {
            type: String,
         },
         tokenId: {
            type: String,
         },
         nftName: {
            type: String,
         },
         nftImage: {
            type: String,
         },
         rarityRank: {
            type: Number,
         },
         nftImageType: {
            type: String,
         },
         txType: {
            type: String,
         },
         send: {
            type: String,
         },
         receive: {
            type: String,
         },
         gas: {
            type: Number,
         },
         timestamp: {
            type: Number, // Changed to Number for consistency
         },
         tradePrice: {
            type: Number,
         },
         tradeSymbol: {
            type: String,
         },
         exchangeName: {
            type: String,
            default: "",
         },
         aggregateExchangeName: {
            type: String,
            default: "",
         },
         marketplace: {
            type: String,
            default: "",
         },
         searchSort: {
            type: [String],
            default: [],
         },
      },
   ],
});

nftdetailsSchema.index({ nftId: 1 });

module.exports = mongoose.model("NftDetails", nftdetailsSchema);
