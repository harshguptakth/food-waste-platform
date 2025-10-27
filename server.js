const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const donorRoutes = require('./routes/donor');
const ngoRoutes = require('./routes/ngo');
const foodRoutes = require('./routes/food');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/donors', donorRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/foods', foodRoutes);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    app.listen(PORT, ()=> console.log('Server running (no DB) on', PORT));
  });
