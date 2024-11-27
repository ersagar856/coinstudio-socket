const mongoose = require("mongoose");
const sideInfoSchema = new mongoose.Schema({
   platformId: {
      type: Number,
      required: true,
   },
   cryptoId: {
      type: Number,
      required: true,
   },
   priceTokenId: {
      type: Number,
      required: true,
   },
   blockChain: {
      type: String,
      required: true,
   },
   contractAddress: {
      type: String,
      required: true,
   },
   logo: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   symbol: {
      type: String,
   },
   description: {
      type: String,
   },
   telegram: {
      type: String,
      default: "",
   },
   ercType: {
      type: String,
   },
   owner: {
      type: String,
   },
   categories: {
      type: [String],
      default: [],
   },
   marketPlaces: [
      {
         name: {
            type: String,
         },
         logo: {
            type: String,
         },
         logoType: {
            type: String,
         },
         volume: {
            type: String,
         },
      },
   ],
   logoType: {
      type: String,
      required: true,
   },
   totalItems: {
      type: Number,
      required: true,
   },
   totalOwners: {
      type: Number,
      required: true,
   },
   totalVolume: {
      type: Number,
      required: true,
   },
   avgPrice24h: {
      type: Number,
      required: true,
   },
   sales24h: {
      type: Number,
      required: true,
   },
   floorPrice: {
      type: Number,
   },
   volume24h: {
      type: Number,
      required: true,
   },
   volume24hPercent: {
      type: Number,
      required: true,
   },
   marketLogo: {
      type: String,
      required: true,
   },
   marketName: {
      type: String,
      required: true,
   },
   floorPriceToken: {
      type: String,
      required: true,
   },
   itemTradeSymbolList: [
      {
         cryptoId: {
            type: String,
            required: true,
         },
         lastTradeSymbol: {
            type: String,
            required: true,
         },
      },
   ],
   dataTimestamp: {
      type: String,
   },
   attributions: [
      {
         name: {
            type: String,
            required: true,
         },
         logoUrl: {
            type: String,
            required: true,
         },
         logoType: {
            type: String,
            required: true,
         },
         homeUrl: {
            type: String,
            required: true,
         },
         platformIds: {
            type: String,
            required: true,
         },
      },
   ],
});

const nftSchema = new mongoose.Schema(
   {
      platformId: {
         type: Number,
         required: true,
      },
      cryptoId: {
         type: Number,
         required: true,
      },
      blockchain: {
         type: String,
         required: true,
      },
      platformAlias: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      symbol: {
         type: String,
         required: true,
      },
      categories: {
         type: [String],
         default: [],
      }, // Array of strings
      floorPrice: {
         type: Number,
         required: true,
      },
      floorPriceUsd: {
         type: Number,
         required: true,
      },
      floorPriceToken: {
         type: String,
         required: true,
      },
      popular: {
         type: Boolean,
         default: false,
      },
      logo: {
         type: String,
         required: true,
      },
      marketCap: {
         type: Number,
         required: true,
      },
      marketCapUsd: {
         type: Number,
         required: true,
      },
      owners: {
         type: Number,
         required: true,
      },
      assets: {
         type: Number,
         required: true,
      },
      dataSource: {
         type: String,
         required: true,
      },
      oneDay: {
         volume: {
            type: Number,
            required: true,
         },
         volumeChangePercentage: {
            type: Number,
            required: true,
         },
         sales: {
            type: Number,
            required: true,
         },
         salesChangePercentage: {
            type: Number,
            required: true,
         },
         averagePrice: {
            type: Number,
            required: true,
         },
         averagePriceChangePercentage: {
            type: Number,
            required: true,
         },
      },
      sevenDay: {
         volume: {
            type: Number,
            required: true,
         },
         volumeChangePercentage: {
            type: Number,
            required: true,
         },
         sales: {
            type: Number,
            required: true,
         },
         salesChangePercentage: {
            type: Number,
            required: true,
         },
         averagePrice: {
            type: Number,
            required: true,
         },
         averagePriceChangePercentage: {
            type: Number,
            required: true,
         },
      },
      thirtyDay: {
         volume: {
            type: Number,
            required: true,
         },
         volumeChangePercentage: {
            type: Number,
            required: true,
         },
         sales: {
            type: Number,
            required: true,
         },
         salesChangePercentage: {
            type: Number,
            required: true,
         },
         averagePrice: {
            type: Number,
            required: true,
         },
         averagePriceChangePercentage: {
            type: Number,
            required: true,
         },
      },
      allTime: {
         volume: {
            type: Number,
            required: true,
         },
         sales: {
            type: Number,
            required: true,
         },
         averagePrice: {
            type: Number,
            required: true,
         },
      },
      contractAddress: {
         type: String,
         required: true,
      },
      ownerAssetsPercentage: {
         type: Number,
         required: true,
      },
      logoType: {
         type: String,
         required: true,
      },
      sideInfo: sideInfoSchema,
   },
   {
      timestamps: true,
   }
);

nftSchema.virtual('nftDetails', {
   ref: 'NftDetails',
   localField: '_id',
   foreignField: 'nftId',
   justOne: false,
 });
 
 nftSchema.set('toObject', { virtuals: true });
 nftSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Nft", nftSchema);
