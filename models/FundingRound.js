const mongoose = require("mongoose");

const InvestorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  tier: {
    type: String,
  },
  avgRoi: {
    type: String,
  },
  portfolio: {
    type: Number,
  },
  unicorns: {
    type: String,
  },
});

const FundingSchema = new mongoose.Schema({
  project: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  round: {
    type: String,
    required: true,
  },
  totalRaised: {
    type: String,
    default: null,
  },
  preValuation: {
    type: String,
    default: null,
  },
  investors: {
    type: [InvestorSchema],
  },
  ecosystem: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  categories: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FundingRound", FundingSchema);
