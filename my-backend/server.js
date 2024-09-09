const express = require('express');
const mongoose = require('mongoose');
const trackRoutes = require('./routes/trackRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);
app.use(cors());
mongoose.connect('mongodb://localhost:27017/tracking', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
// Express session
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/tracks', trackRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
