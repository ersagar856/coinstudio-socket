const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
   slug: { type: String },
   name: { type: String },
   category: { type: String },
});
const urlsSchema = new mongoose.Schema({
   website: [{ type: String }],
   technical_doc: [{ type: String }],
   explorer: [{ type: String }],
   source_code: [{ type: String }],
   message_board: [{ type: String }],
   chat: [{ type: String }],
   announcement: [{ type: String }],
   reddit: [{ type: String }],
   facebook: [{ type: String }],
   twitter: [{ type: String }],
});
const statisticsSchema = new mongoose.Schema({
   price: { type: Number },
   priceChangePercentage1h: { type: Number },
   priceChangePercentage24h: { type: Number },
   priceChangePercentage7d: { type: Number },
   priceChangePercentage30d: { type: Number },
   priceChangePercentage60d: { type: Number },
   priceChangePercentage90d: { type: Number },
   priceChangePercentage1y: { type: Number },
   priceChangePercentageAll: { type: Number },
   marketCap: { type: Number },
   marketCapChangePercentage24h: { type: Number },
   fullyDilutedMarketCap: { type: Number },
   fullyDilutedMarketCapChangePercentage24h: { type: Number },
   circulatingSupply: { type: Number },
   totalSupply: { type: Number },
   maxSupply: { type: Number },
   marketCapDominance: { type: Number },
   rank: { type: Number },
   roi: { type: Number },
   low24h: { type: Number },
   high24h: { type: Number },
   low7d: { type: Number },
   high7d: { type: Number },
   low30d: { type: Number },
   high30d: { type: Number },
   low90d: { type: Number },
   high90d: { type: Number },
   low52w: { type: Number },
   high52w: { type: Number },
   lowAllTime: { type: Number },
   highAllTime: { type: Number },
   lowAllTimeChangePercentage: { type: Number },
   highAllTimeChangePercentage: { type: Number },
   lowAllTimeTimestamp: { type: Date },
   highAllTimeTimestamp: { type: Date },
   lowYesterday: { type: Number },
   highYesterday: { type: Number },
   openYesterday: { type: Number },
   closeYesterday: { type: Number },
   priceChangePercentageYesterday: { type: Number },
   volumeYesterday: { type: Number },
   turnover: { type: Number },
   ytdPriceChangePercentage: { type: Number },
   volumeRank: { type: Number },
   volumeMcRank: { type: Number },
   mcTotalNum: { type: Number },
   volumeTotalNum: { type: Number },
   volumeMcTotalNum: { type: Number },
   status: { type: String },
});
const walletSchema = new mongoose.Schema({
   id: { type: Number },
   name: { type: String },
   tier: { type: Number },
   url: { type: String },
   chains: { type: String },
   types: { type: String },
   introduction: { type: String },
   star: { type: Number },
   security: { type: Number },
   easyToUse: { type: Number },
   decentration: { type: Boolean },
   focusNumber: { type: Number },
   rank: { type: Number },
   logo: { type: String },
   multipleChain: { type: Boolean },
});
const holderListSchema = new mongoose.Schema({
   address: { type: String },
   balance: { type: Number },
   share: { type: Number },
});
const holdersSchema = new mongoose.Schema({
   holderCount: { type: Number },
   dailyActive: { type: Number },
   holderList: [holderListSchema],
   topTenHolderRatio: { type: Number },
   topTwentyHolderRatio: { type: Number },
   topFiftyHolderRatio: { type: Number },
   topHundredHolderRatio: { type: Number },
});
const auditInfoSchema = new mongoose.Schema({});
const QuoteSchema = new mongoose.Schema({
   name: String,
   price: Number,
   volume24h: Number,
   marketCap: Number,
   selfReportedMarketCap: Number,
   percentChange1h: Number,
   percentChange24h: Number,
   percentChange7d: Number,
   lastUpdated: Date,
   percentChange30d: Number,
   percentChange60d: Number,
   percentChange90d: Number,
   fullyDilluttedMarketCap: Number,
   marketCapByTotalSupply: Number,
   dominance: Number,
   turnover: Number,
   ytdPriceChangePercentage: Number,
   percentChange1y: Number,
   csScore: Number,
});
const CryptoSchema = new mongoose.Schema({
   id: { type: Number },
   name: { type: String },
   symbol: { type: String },
   slug: { type: String },
   category: { type: String },
   dateAdded: { type: Date },
   status: { type: String },
   subStatus: { type: String },
   notice: { type: String },
   alertType: { type: Number },
   alertLink: { type: String },
   latestUpdateTime: { type: Date },
   watchCount: { type: Number },
   watchListRanking: { type: Number },
   dateLaunched: { type: Date },
   latestAdded: { type: Boolean },
   launchPrice: { type: Number },
   quote: [QuoteSchema],
   tags: [tagSchema],
   pricing: [Number],
   urls: urlsSchema,
   volume: { type: Number },
   volumeChangePercentage24h: { type: Number },
   cexVolume: { type: Number },
   dexVolume: { type: Number },
   statistics: statisticsSchema,
   wallets: [walletSchema],
   isAudited: { type: Boolean },
   auditInfos: [auditInfoSchema],
   holders: holdersSchema,
});
module.exports = mongoose.model("Crypto", CryptoSchema);
