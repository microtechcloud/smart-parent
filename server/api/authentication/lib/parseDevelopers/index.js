const request = require("request");
const createError = require("http-errors");

module.exports = (req,res,next)=>{
  res.send("devs")
}