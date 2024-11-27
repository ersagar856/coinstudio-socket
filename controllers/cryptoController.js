const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Crypto = require("../models/CryptoModel.js");


//Add category
const addCrypto = asyncHandler(async (req, res) => {
     const cryptoData = req.body;
     console.log(cryptoData);
     const existingCrypto = await Crypto.findOne({ id: cryptoData.id });
     if (existingCrypto) {
          throw new ApiError(409, "Crypto name already exists");
     }
     const newCrepto = await Crypto.create(cryptoData);
     return res
          .status(201)
          .json(new ApiResponse(200, newCrepto, "Crypto Created successfully"));
});
//get method
const getCrypto = asyncHandler(async (req, res) => {
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 10;
     const skip = (page - 1) * limit;
     const tagSlugs = req.query.tagSlugs ? req.query.tagSlugs.split(",") : [];
     const cryptoType = req.query.cryptoType || "all";
     const marketCapRange = req.query.marketCapRange || "";
     const percentChange24hRange = req.query.percentChange24hRange || "";
     const volume24hRange = req.query.volume24hRange || "";
     const circulatingSupplyRange = req.query.circulatingSupplyRange || "";
     const prising = [
          67822, 67922.45, 67971.43, 68105.89, 68000.78, 67742.72, 67555.41,
          68104, 68084, 67218.95, 67420.22, 67444.01, 67084, 66940, 66829.24,
          66949.78, 67290, 67370.46, 67590.66, 67124, 67007.18, 67171.42,
          66879.5, 67216.94, 67191.4,
     ];
     // const csScore = 0.72;
     let filter = {};
     if (tagSlugs.length > 0) {
          filter.tags = { $elemMatch: { slug: { $in: tagSlugs } } };
     }
     if (cryptoType && cryptoType !== "all") {
          filter.category = cryptoType;
     }

     const setRangeFilter = (fieldPath, rangeString) => {
          const [min, max] = rangeString.split("~").map(Number);
          if (!isNaN(min) && !isNaN(max)) {
               filter[fieldPath] = { $gte: min, $lte: max };
          }
     };
     if (marketCapRange) setRangeFilter("quote.0.marketCap", marketCapRange);
     if (percentChange24hRange)
          setRangeFilter("quote.0.percentChange24h", percentChange24hRange);
     if (volume24hRange) setRangeFilter("quote.0.volume24h", volume24hRange);
     if (circulatingSupplyRange)
          setRangeFilter("circulatingSupply", circulatingSupplyRange);
     const [data, totalRecords] = await Promise.all([
          Crypto.find(filter).skip(skip).limit(limit),
          Crypto.countDocuments(filter),
     ]);
     console.log(data)
     const transformedResults = data.map((cryptoData) => {
          return {
               id: cryptoData.id,
               name: cryptoData.name,
               symbol: cryptoData.symbol,
               slug: cryptoData.slug,
               tags: cryptoData.tags.map((tag) => tag.slug),
               cmcRank: 1,
               marketPairCount: 11793,
               circulatingSupply: cryptoData.statistics.circulatingSupply,
               selfReportedCirculatingSupply: 0,
               totalSupply: cryptoData.statistics.totalSupply,
               maxSupply: cryptoData.statistics.maxSupply,
               isActive: 1,
               lastUpdated: cryptoData.quote[0]?.lastUpdated || "",
               dateAdded: cryptoData.dateAdded,
               pricing: cryptoData.pricing || [],
               quotes: cryptoData.quote.map((quote) => ({
                    name: quote.name,
                    price: quote.price,
                    volume24h: quote.volume24h,
                    marketCap: quote.marketCap,
                    percentChange1h: quote.percentChange1h,
                    percentChange24h: quote.percentChange24h,
                    percentChange7d: quote.percentChange7d,
                    lastUpdated: quote.lastUpdated,
                    percentChange30d: quote.percentChange30d,
                    percentChange60d: quote.percentChange60d,
                    percentChange90d: quote.percentChange90d,
                    csScore: quote.csScore,
               })),
               isAudited: cryptoData.isAudited,
               auditInfoList: [],
               badges: [1],
          };
     });
     const responseData = {
          totalRecords,
          currentPage: page,
          totalPages: Math.ceil(totalRecords / limit),
          cryptoCurrencyList: transformedResults,
     };

     return res
          .status(200)
          .json(
               new ApiResponse(200, responseData, "Crypto fetched successfully")
          );
});
//get crypto by slug
const getCryptoBySlug = asyncHandler(async (req, res) => {
     const { slug } = req.params;
     const crypto = await Crypto.findOne({ slug });

     if (!crypto) {
          return res
               .status(404)
               .json(new ApiResponse(404, null, "crypto not found"));
     }
     return res
          .status(200)
          .json(new ApiResponse(200, crypto, "crypto fetched successfully"));
});
// get crypto by tags
const getCryptoByTags = asyncHandler(async (req, res) => {
     const tagsSlug = req.params.slug;
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 10;
     const skip = (page - 1) * limit;
     const cryptoData = await Crypto.find(
          {
               "tags.slug": { $in: [tagsSlug] },
          },
          {
               "id": 1,
               "name": 1,
               "symbol": 1,
               "slug": 1,
               "tags.name": 1,
               "statistics.cmcRank": 1,
               "statistics.marketPairCount": 1,
               "statistics.circulatingSupply": 1,
               "statistics.selfReportedCirculatingSupply": 1,
               "statistics.totalSupply": 1,
               "statistics.maxSupply": 1,
               "statistics.isActive": 1,
               "statistics.lastUpdated": 1,
               "statistics.dateAdded": 1,
               "quote": 1,
               "pricing":1,
               "urls": 1,
               "isAudited": 1,
               "_id": 0,
          }).skip(skip).limit(limit);
          console.log(cryptoData)
     const formattedCryptoData = cryptoData.map((crypto) => ({
          ...crypto._doc,
          tags: crypto.tags.map((tag) => tag.name),
          
     }));

     if (!formattedCryptoData || formattedCryptoData.length === 0) {
          return res
               .status(404)
               .json(new ApiResponse(404, null, "crypto not found"));
     }
     // Check if data was found
     if (cryptoData.length === 0) {
          return res
               .status(404)
               .json(
                    new ApiResponse(
                         404,
                         null,
                         "No cryptos found with the specified tag"
                    )
               );
     }

     // Return the found data
     return res
          .status(200)
          .json(
               new ApiResponse(
                    200,
                    formattedCryptoData,
                    `Found ${cryptoData.length} crypto(s) tagged with "${tagsSlug}"`
               )
          );
});
module.exports = {
     addCrypto,
     getCrypto,
     getCryptoBySlug,
     getCryptoByTags,
};
