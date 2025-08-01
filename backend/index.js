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


const allowedOrigins = [
  'https://blog-zeta-six-78.vercel.app',
  'https://blog-frontend-19zz.onrender.com',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
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
    cookie: { secure: false } 
}));


app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running!',
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
        frontendUrl: process.env.FRONTEND_URL || 'https://blog-zeta-six-78.vercel.app'
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
        console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'https://blog-zeta-six-78.vercel.app'}`);
    });
}).catch(err => {
    console.error('❌ MongoDB connection failed:', err);
});

