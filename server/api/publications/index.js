const {articles} = require("./lib");


module.exports = {
    
    articles:{
        post:(req,res,next)=>articles._create(req,res,next),
        get:(req,res,next)=>articles._fetch(req,res,next),
        put:(req,res,next)=>articles._modify(req,res,next),
        delete:(req,res,next)=>articles._delete(req,res,next)
    }
}