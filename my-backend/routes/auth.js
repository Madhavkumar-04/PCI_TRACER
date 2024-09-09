const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path as needed

const router = express.Router();

// Local Sign Up
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save user
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Local Sign In
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'No user found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user.id }, 'yourJWTSecret', { expiresIn: 3600 });
            return res.json({ token, user });
        } else {
            return res.status(400).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Google Authentication (You will need to handle OAuth flows manually)
router.get('/google', (req, res) => {
    // Redirect to Google OAuth endpoint
});

// Facebook Authentication (You will need to handle OAuth flows manually)
router.get('/facebook', (req, res) => {
    // Redirect to Facebook OAuth endpoint
});

module.exports = router;
