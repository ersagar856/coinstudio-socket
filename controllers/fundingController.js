const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const fundingRoundModel = require("../models/FundingRound.js");

const addFundingRound = asyncHandler(async (req, res) => {
     const fundingData = req.body;

     existingFundingData = await fundingRoundModel.findOne({
          project: fundingData.project,
     });

     if (existingFundingData) {
          throw new ApiError(409, "Funding data already exists!");
     }
     const newFundingData = await fundingRoundModel.create(fundingData);
     return res
          .status(201)
          .json(
               new ApiResponse(
                    200,
                    newFundingData,
                    "Funding data added successfully!"
               )
          );
});
const getFundingRound = asyncHandler(async (req, res) => {
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 20;
     const skip = (page - 1) * limit;

     const fundingRound = await fundingRoundModel
          .find()
          .skip(skip)
          .limit(limit);
     const totalfundingRound = await fundingRoundModel.countDocuments();

     const responseData = {
          pagination: {
               totalItems: totalfundingRound,
               totalPages: Math.ceil(totalfundingRound / limit),
               currentPage: page,
               pageSize: limit,
          },
          fundingRound,
     };
     return res
          .status(200)
          .json(
               new ApiResponse(
                    200,
                    responseData,
                    "Funding Round fetched successfully"
               )
          );
});

module.exports = {
     addFundingRound,
     getFundingRound,
};
