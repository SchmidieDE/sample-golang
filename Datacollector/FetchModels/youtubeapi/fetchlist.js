const mongoose = require('mongoose')

const fetchlistSchema = new mongoose.Schema({
    channelIds: [
        {YtID: String, Name: String}
    ],
    LastUpdated: {
        type: Number,
        required: true
    },
    _id: {
        type: String,
        default: 'FetchList'
    }
})

const FetchList = mongoose.model('fetchlist', fetchlistSchema);

module.exports = FetchList; 