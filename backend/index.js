const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
const app = express();

// Passport config
require('./config/passport')(passport);

// CORS configuration with environment variables
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Express session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-super-secret-session-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running!',
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogsphere')
.then(() => {
    console.log('MongoDB connected successfully');
    const port = process.env.PORT || 3001;
    const backendUrl = process.env.BACKEND_URL || `http://localhost:${port}`;
    app.listen(port, () => {
        console.log(`✅ Server running on ${backendUrl}`);
        console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
}).catch(err => {
    console.error('❌ MongoDB connection failed:', err);
});