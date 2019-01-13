const createError = require("http-errors");
const {Users} = require("../../../../../lib").DB.DB;

module.exports = (req,res,next)=>{
    let {id} = req.body

    return Users.findOne({})
        .then(user=>{
            return res.json({success:true, message:"operation successfull",id}); //
        })
        .catch(err=>err)
    
}