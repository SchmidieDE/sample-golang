const mongoose = require('mongoose')

const channelInfoSchema = new mongoose.Schema({
    YtID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    channelInfo: [
        {Timestamp: Number, ViewCount: Number, VideoCount: Number, SubscriberCount: Number}
    ],
    LastUpdated: {
        type: Number,
        required: true
    },
    
})

const ChannelInfo = mongoose.model('channelInfo', channelInfoSchema);

module.exports = ChannelInfo; 