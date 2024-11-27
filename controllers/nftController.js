const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const nft = require("../models/NftModels.js");
const nftdetails = require("../models/NftDetailsModel.js");

// add nft

const addNftData = asyncHandler(async (req, res) => {
   const nftData = req.body;
   console.log(nftData);
   //  const existingNft = await nft.findOne({ platformId: nftData.platformId });
   //  if(existingNft){
   //     throw new ApiError(409, "Nft already exists");
   //  }
   const newnft = await nft.create(nftData);
   return res
      .status(201)
      .json(new ApiResponse(200, newnft, "Nft Created successfully"));
});

// get all nft's

const getNftsdata = asyncHandler(async (req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const skip = (page - 1) * limit;
   const period = parseInt(req.query.period) || 1;
   console.log(period);

   let projection = {
      _id: 1,
      platformId: 1,
      cryptoId: 1,
      blockchain: 1,
      platformAlias: 1,
      name: 1,
      symbol: 1,
      categories: 1,
      floorPrice: 1,
      floorPriceUsd: 1,
      floorPriceToken: 1,
      popular: 1,
      logo: 1,
      marketCap: 1,
      marketCapUsd: 1,
      owners: 1,
      assets: 1,
      dataSource: 1,
      contractAddress: 1,
      ownerAssetsPercentage: 1,
      logoType: 1,
      items: 1,
   };
   switch (period) {
      case 2:
         projection.sevenDay = 1;
         break;
      case 3:
         projection.thirtyDay = 1;
         break;
      case 4:
         projection.allTime = 1;
         break;
      default:
         projection.oneDay = 1;
   }
   const nftData = await nft.find().skip(skip).limit(limit).select(projection);
   const totalNftData = await nft.countDocuments();

   const responseData = {
      pagination: {
         totalItems: totalNftData,
         totalPages: Math.ceil(totalNftData / limit),
         currentPage: page,
         pageSize: limit,
      },
      nftData,
   };

   return res
      .status(200)
      .json(new ApiResponse(200, responseData, "Nft fetched successfully"));
});

const getNftsdetails = asyncHandler(async (req, res) => {
   const { contractAddress, name } = req.params;
   console.log(name);
   if (!contractAddress || !name) {
      return res
         .status(400)
         .json(new ApiResponse(400, null, "Invalid parameters provided"));
   }

   const nftData = await nft
      .findOne({ contractAddress, name })
      .select("sideInfo").populate('nftDetails');
   if (!nftData) {
      return res.status(404).json(new ApiResponse(404, null, "nft not found"));
   }
   return res
      .status(200)
      .json(new ApiResponse(200, nftData, "Nft fetched successfully"));
});

const addNftDetails = asyncHandler(async (req, res) => {
   const nftDetails = req.body;
   console.log(nftDetails);
   const newnftDetails = await nftdetails.create(nftDetails);
   return res
      .status(201)
      .json(new ApiResponse(200, newnftDetails, "Nft Created successfully"));
});

module.exports = {
   addNftData,
   getNftsdata,
   getNftsdetails,
   addNftDetails,
};
