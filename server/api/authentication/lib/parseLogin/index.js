const {Users} = require("../../../../lib").DB.DB;
const createError = require("http-errors");
const jwt  = require("jsonwebtoken");
  

module.exports = (req,res,next)=>{

    let _payload = `${req.body.username}`;

    jwt.sign(_payload,process.env.JWTLOGINSECRET,function(err,token){
     
        if(err){
            return next(createError({success:false,message:"operation not succesfful"}));
        };

        return res.json({success:true,message:"Operation Succesful",token, id:req.body.username});
    })
}
