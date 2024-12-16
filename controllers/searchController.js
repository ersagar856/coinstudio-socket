const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const Crypto = require("../models/CryptoModel.js");
const Exchange = require("../models/ExchangeModel.js");
const nft = require("../models/NftModels.js");

// get trending currency

const getTrendingCurrency = asyncHandler(async (req, res) => {
   const cryptoData = req.body;

   const top2Highest = await Crypto.find({
      quote: { $exists: true, $ne: null, $not: { $size: 0 } },
      "quote.percentChange24h": { $exists: true },
   })
      .sort({ "quote.percentChange24h": -1 })
      .limit(2);

   const top2Lowest = await Crypto.find({
      quote: { $exists: true, $ne: null, $not: { $size: 0 } },
      "quote.percentChange24h": { $exists: true },
   })
      .sort({ "quote.percentChange24h": 1 })
      .limit(2);

   // Merge results
   const data = [...top2Highest, ...top2Lowest];

   console.log(data);

   const transformedResults = data.map((cryptoData) => {
      return {
         id: cryptoData.id,
         name: cryptoData.name,
         symbol: cryptoData.symbol,
         slug: cryptoData.slug,

         isActive: 1,
         priceChange: cryptoData.quote.map((quote) => ({
            price: quote.price,
            volume24h: quote.volume24h,
            marketCap: quote.marketCap,
            priceChange24h: quote.percentChange24h,
            priceChange7d: quote.percentChange7d,
            lastUpdated: quote.lastUpdated,
            priceChange30d: quote.percentChange30d,
         })),
      };
   });

   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            transformedResults,
            "Trending Crypto fetched successfully"
         )
      );
});

const searchCoinNFtExchange = asyncHandler(async (req, res) => {
   const { search } = req.query;

   if (!search || search.trim() === "") {
      return getTrendingCurrency(req, res);
   }

   const searchRegex = search ? new RegExp(search, "i") : null;

   if (searchRegex) {
      console.log(searchRegex); // Valid regex if `search` is not empty
   } else {
      console.log("Search term is empty. No regex created.");
   }

   const cryptoProjection = { name: 1, symbol: 1, _id: 1, id: 1 };
   const exchangeProjection = { name: 1, symbol: 1, _id: 1, id: 1, slug: 1 };
   const nftProjection = { name: 1, category: 1, _id: 1, description: 1 };

   // Search in Crypto model
   const cryptoResults = await Crypto.find(
      { $or: [{ slug: searchRegex }] },
      cryptoProjection
   );

   // Search in Exchange model
   const exchangeResults = await Exchange.find(
      { $or: [{ slug: searchRegex }] },
      exchangeProjection
   );

   // Search in nft model
   const nftResults = await nft.find(
      {
         $or: [{ name: searchRegex }],
      },
      nftProjection
   );

   // Combine results
   const results = {
      crypto: cryptoResults,
      exchange: exchangeResults,
      nft: nftResults,
   };

   return res
      .status(200)
      .json(new ApiResponse(200, results, "data fetch successfully"));
});

module.exports = {
   getTrendingCurrency,
   searchCoinNFtExchange,
};
