const jwt  = require("jsonwebtoken");
const createError  = require("http-errors");

module.exports = (req,res,next)=>{

    let {token}  = req.query;
   
    jwt.verify(token,process.env.JWTLOGINSECRET,function(err,payload,_payload){

        if(err){
            console.debug(err);
            return next(createError({success:false,message:"invalid token"}));
        };

        return res.json({success:true,message:"operation successfull",err,payload});
    });
}