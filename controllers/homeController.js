const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const {
   FearGreedChatModel,
   TodayInsightsModel,
   OurRatingModel,
   TrendingModel,
   AirDropModel,
   InsightsModel,
} = require("../models/HomeModel.js");

const addFreedGreed = asyncHandler(async (req, res) => {
   const data = req.body;

   if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
         status: "error",
         message: "No data provided, unable to add home details.",
      });
   }
   const newData = await FearGreedChatModel.create(data);
   return res
      .status(201)
      .json(
         new ApiResponse(200, newData, "Frees Greed data added successfully!")
      );
});
const addTodayInsights = asyncHandler(async (req, res) => {
   const data = req.body;

   if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
         status: "error",
         message: "No data provided, unable to add home details.",
      });
   }
   const newData = await TodayInsightsModel.create(data);
   return res
      .status(201)
      .json(
         new ApiResponse(
            200,
            newData,
            "Today insights data added successfully!"
         )
      );
});
const addOurRating = asyncHandler(async (req, res) => {
   const data = req.body;
   console.log("data", data);

   if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
         status: "error",
         message: "No data provided, unable to add home details.",
      });
   }

   const newData = await OurRatingModel.create(data);
   return res
      .status(201)
      .json(new ApiResponse(200, newData, "Rating data added successfully!"));
});
const addTrending = asyncHandler(async (req, res) => {
   const data = req.body;
   console.log("data", data);

   if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
         status: "error",
         message: "No data provided, unable to add home details.",
      });
   }

   const newData = await TrendingModel.create(data);
   return res
      .status(201)
      .json(new ApiResponse(200, newData, "Rating data added successfully!"));
});
const addAirDrop = asyncHandler(async (req, res) => {
   const data = req.body;
   console.log("data", data);

   if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
         status: "error",
         message: "No data provided, unable to add home details.",
      });
   }

   const newData = await AirDropModel.create(data);
   return res
      .status(201)
      .json(new ApiResponse(200, newData, "Air drop added successfully!"));
});
const addInsights = asyncHandler(async (req, res) => {
   const data = req.body;
   console.log("data", data);

   if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
         status: "error",
         message: "No data provided, unable to add home details.",
      });
   }

   const newData = await InsightsModel.create(data);
   return res
      .status(201)
      .json(new ApiResponse(200, newData, "Insights added successfully!"));
});

const getHomeDetails = asyncHandler(async (req, res) => {
   try {
      const [fearGreedChat, todayInsights, ourRating, trending, airDrop,insights] =
         await Promise.all([
            FearGreedChatModel.findOne().exec(),
            TodayInsightsModel.findOne().exec(),
            OurRatingModel.findOne().exec(),
            TrendingModel.findOne().exec(),
            AirDropModel.findOne().exec(),
            InsightsModel.findOne().exec(),
         ]);
        //  console.log(airDrop.title)
      const data = {
         fearGreedChat: {
            title: fearGreedChat?.title,
            value: fearGreedChat ? fearGreedChat.value : null,
         },
         todayInsights: {
            title: fearGreedChat?.title,
            subTitle: todayInsights?.subTitle,
            options: todayInsights ? todayInsights.options : [],
         },
         ourRating: {
            title: ourRating?.title,
            subHead: ourRating?.subHead,
            showNavigation: true,
            options: ourRating ? ourRating.options : [],
         },
         treanding: {
            showNavigation: true,
            trendingData: trending ? trending.trendingData : [],
            gainer: trending ? trending.gainer : [],
            losers: trending ? trending.losers : [],
         },
         airDrop: {
            title: airDrop?.title,
            lottieUrl:airDrop?.lottieUrl,
            options: airDrop ? airDrop.options : [],
         },
         insights: {
            title: insights?.title,
            options: insights ? insights.options : [],
         },
      };
      return res
      .status(200)
      .json(new ApiResponse(200, data, "Details got successfully!"));
   } catch (error) {}
});

module.exports = {
   addFreedGreed,
   addTodayInsights,
   addOurRating,
   addTrending,
   addAirDrop,
   addInsights,
   getHomeDetails,
};
