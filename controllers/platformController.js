const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Platform = require("../models/PlatformModel.js");

const addPlatform = asyncHandler(async (req, res) => {
     const { id, name, isActive, popular } = req.body;
     const existingPlatform = await Platform.findOne({ name });
     if (existingPlatform) {
          throw new ApiError(409, "Platform name already exists");
     }
     const newPlatform = await Platform.create({
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
                    newPlatform,
                    "Platform Created successfully"
               )
          );
});
//get method
const getAllPlatform = asyncHandler(async (req, res) => {
     const platform = await Platform.find({});
     const responseData = {
          platform,
     };

     return res
          .status(200)
          .json(
               new ApiResponse(
                    200,
                    responseData,
                    "Platform fetched successfully"
               )
          );
});
module.exports = {
     addPlatform,
     getAllPlatform,
};
