const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Industry = require("../models/IndustryModel.js");

const addIndustry = asyncHandler(async (req, res) => {
     const { id, name, isActive, popular } = req.body;
     const existingIndustry = await Industry.findOne({ name });
     if (existingIndustry) {
          throw new ApiError(409, "Industry name already exists");
     }
     const newIndustry = await Industry.create({
          id,
          name,
          isActive,
          popular,
     });
     return res
          .status(201)
          .json(
               new ApiResponse(
                    200,
                    newIndustry,
                    "Industry Created successfully"
               )
          );
});
//get method
const getAllIndustry = asyncHandler(async (req, res) => {
     const industry = await Industry.find({});
     const responseData = {
          industry,
     };

     return res
          .status(200)
          .json(
               new ApiResponse(
                    200,
                    responseData,
                    "Industry fetched successfully"
               )
          );
});

module.exports = {
     addIndustry,
     getAllIndustry,
};
