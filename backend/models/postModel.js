const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    posterId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    addressGeocodeLat: {
        type: Number,
        required: true
    },
    addressGeocodeLng: {
        type: Number,
        required: true
    },
    addressGoogleMapsUrl: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema)