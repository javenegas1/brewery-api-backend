const mongoose = require('mongoose');

require('dotenv').config();

const connectionStr = process.env.MONGO_KEY;
console.log(connectionStr)

mongoose.connect(connectionStr);

mongoose.connection.on('open', () => {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`); 
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error 😥', error);
});

mongoose.connection.on('close', () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'));