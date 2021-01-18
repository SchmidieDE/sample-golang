const mongoose = require('mongoose')

const trendsSchema = new mongoose.Schema({
    countryname: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    totalTrends: {
        type: Number
    },
    totalCryptoTrends: {
        type: Number
    },
    trends: [
        {Timestamp: Number, Keyword: String, Tweet_volume: Number}
    ],
    LastUpdated: {
        type: Number,
        required: true
    }
})

const TwitterTrends = mongoose.model('twittertrend', trendsSchema);

module.exports = TwitterTrends; 