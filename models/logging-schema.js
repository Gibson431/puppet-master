const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const logSchema = new mongoose.Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    channelName: reqString
})

module.exports = mongoose.model('logging-schema', logSchema)