const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let conn = process.env.DB_URL;
mongoose.connect(conn, { useNewUrlParser: true });

module.exports = mongoose;