const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    trackno: { type: String, required: true },
    details: { type: String, required: true }
}, { timestamps: true });

const TrackModel = mongoose.model('Track', TrackSchema);

module.exports = TrackModel;
