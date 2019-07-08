const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;
console.log(process.env.DB_URL);
let conn = process.env.DB_URL;
mongoose.connect(conn,{useNewUrlParser:true});

module.exports = mongoose;