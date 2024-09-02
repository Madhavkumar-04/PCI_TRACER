const express = require('express');
const router = express.Router();
const TrackModel = require('../models/TrackModel');

// GET all tracks
router.get('/', async (req, res) => {
    try {
        const tracks = await TrackModel.find();
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new track
router.post('/', async (req, res) => {
    let { trackno, details } = req.body;
    details = JSON.stringify(details)
    const newTrack = new TrackModel({ trackno, details });
    try {
        const savedTrack = await newTrack.save();
        console.log("cll")
        res.status(201).json("data is saved");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
