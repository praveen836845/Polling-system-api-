const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
module.exports = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("CONNECTION ESTABLISHED"));