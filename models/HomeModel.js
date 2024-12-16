const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema(
   {
      id: Number,
      iconUrl: String,
      label: String,
      value: String,
      globalMarketCap: Number,
      pricing: [String],
      backGroundFrom: String,
      backgroundTo: String,
      borderColorLine: String,
      datasetsLabel: String,
      precision: Number,
   },
   { _id: false }
);
const TodayInsightsSchema = new mongoose.Schema({
   title: String,
   subTitle: String,
   options: [PricingSchema],
});
// Schema for "fearGreedChat"
const FearGreedChatSchema = new mongoose.Schema({
   title: String,
   value: Number,
});

const OurRatingOptionSchema = new mongoose.Schema(
   {
      id: Number,
      iconUrl: String,
      value: Number,
      maxValue: Number,
      strokeWidth: Number,
      type: String,
      offsetColor1: String,
      offsetColor2: String,
      offsetColor3: String,
   },
   { _id: false }
);

const OurRatingSchema = new mongoose.Schema({
   title: String,
   subHead: String,
   showNavigation: Boolean,
   options: [OurRatingOptionSchema],
});

const TrendingOptionSchema = new mongoose.Schema(
   {
      id: Number,
      iconUrl: String,
      name: String,
      symbol: String,
      slug: String,
      cType: String,
      precision: Number,
      price: Number,
   },
   { _id: false }
);

const TrendingDataSchema = new mongoose.Schema(
   {
      id: Number,
      title: String,
      options: [TrendingOptionSchema],
   },
   { _id: false }
);
const GainerLoserSchema = new mongoose.Schema(
   {
      id: Number,
      iconUrl: String,
      name: String,
      symbol: String,
      slug: String,
      percentChange24h: Number,
   },
   { _id: false }
);

const TrendingSchema = new mongoose.Schema({
   showNavigation: Boolean,
   trendingData: [TrendingDataSchema],
   gainer: [GainerLoserSchema],
   losers: [GainerLoserSchema],
});

const AirDropOptionSchema = new mongoose.Schema(
   {
      id: Number,
      iconUrl: String,
      name: String,
      symbol: String,
      slug: String,
      cType: String,
      precision: Number,
      price: Number,
   },
   { _id: false }
);

const AirDropSchema = new mongoose.Schema({
   title: String,
   lottieUrl: String,
   options: [AirDropOptionSchema],
});

const InsightExchangeSchema = new mongoose.Schema({
   id: Number,
   iconUrl: String,
   label: String,
   value: String,
   price: String,
});

const OptionInsightSchema = new mongoose.Schema({
   id: Number,
   iconUrl: String,
   label: String,
   value: String,
   exchanges: [InsightExchangeSchema],
});

const InsightsSchema = new mongoose.Schema({
   title: String,
   options: [OptionInsightSchema],
});

// const DataSchema = new mongoose.Schema({
//    todayInsights: TodayInsightsSchema,
//    fearGreedChat: FearGreedChatSchema,
//    ourRating: OurRatingSchema,
//    trending: TrendingSchema,
//    airDrop: AirDropSchema,
//    insights: InsightsSchema,
// });

const FearGreedChatModel = mongoose.model("FearGreedChat", FearGreedChatSchema);
const TodayInsightsModel = mongoose.model("TodayInsights", TodayInsightsSchema);
const OurRatingModel = mongoose.model("OurRating", OurRatingSchema);
const TrendingModel = mongoose.model("Trending", TrendingSchema);
const AirDropModel = mongoose.model("AirDrop", AirDropSchema);
const InsightsModel = mongoose.model("Insights", InsightsSchema);

module.exports = {
   FearGreedChatModel,
   TodayInsightsModel,
   OurRatingModel,
   TrendingModel,
   AirDropModel,
   InsightsModel,
};
