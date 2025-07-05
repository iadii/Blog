const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Determine frontend URL based on environment
const FRONTEND_URL = process.env.NODE_ENV === 'production' 
    ? 'https://blog-zeta-six-78.vercel.app/'
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
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
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