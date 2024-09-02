const express = require('express');
const mongoose = require('mongoose');
const trackRoutes = require('./routes/trackRoutes');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
mongoose.connect('mongodb+srv://Delote:eeeee@clustedee.t673u.mongodb.net/tracking', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.json());

app.use('/api/tracks', trackRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
