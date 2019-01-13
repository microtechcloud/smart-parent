const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI_DEV,{ useNewUrlParser: true });

const db = mongoose.connection;

db.once("error",(e)=>process.exit(1)); //kill server

db.on("open",()=>console.log("MONGODB RUNNING")); //log 

module.exports = db;