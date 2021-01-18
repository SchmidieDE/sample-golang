const mongoose = require('mongoose')

const assetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    availableSupply: {
        type: Number,
        required: true
    },
    totalSupply: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

const Assets = mongoose.model('coinstatsAsset', assetsSchema);

module.exports = Assets; 