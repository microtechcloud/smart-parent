const parseForgotPassword = require("./parseForgotPassword");

module.exports = {
    client:{
        post:(req,res,next)=>parseForgotPassword(req,res,next)
    },
    admin:{}
}