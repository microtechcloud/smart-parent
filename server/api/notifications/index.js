const {pushNotifications} = require("./lib");
const processNotifications  = require("./lib/notifcations");

module.exports = {
    notifications:{
        admin:{},
        client:{
            get:(req,res,next)=>res.json({success:true,message:"push notications"}),
            // post:(req,res,next)=>pushNotifications(req,res,next)
            post:(req,res,next)=>processNotifications(req,res,next)
        }
    }
}