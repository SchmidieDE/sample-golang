const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    sources: [{
        source: String, total: Number
    }],
    totalResults: {
        type: Number,
        default: 0,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

const NewsApi = mongoose.model('newsapi', newsSchema);

module.exports = NewsApi; 