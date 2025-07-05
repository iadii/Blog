const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Determine frontend URL based on environment
const FR_URL = 'https://blog-zeta-six-78.vercel.app/' || "https://blog-frontend-19zz.onrender.com"
const FRONTEND_URL = process.env.NODE_ENV === 'production' 
    ? FR_URL
    : 'http://localhost:5173';

// Google OAuth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Generate JWT token
        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Redirect to frontend with token
        res.redirect(`${FRONTEND_URL}/auth/success?token=${token}`);
    }
);

// Get current user
router.get('/me', async (req, res) => {
    try {
        // Debug: Log the Authorization header
        console.log('Authorization header:', req.header('Authorization'));
        const token = req.header('Authorization')?.replace('Bearer ', '');
        // Debug: Log the extracted token
        console.log('Extracted token:', token);
        // Debug: Log the JWT secret
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log('JWT verification error:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }
        // Debug: Log the decoded payload
        console.log('Decoded:', decoded);
        const user = await User.findById(decoded.userId);
        // Debug: Log the user lookup result
        console.log('User:', user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;