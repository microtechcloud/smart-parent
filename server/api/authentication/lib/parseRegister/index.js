const createError = require("http-errors");
const {Users} = require("../../../../lib").DB.DB;

module.exports = (req,res,next)=>{
    
    //party type
        let {type} = req.query;
    
    let {
        firstName,
        lastName,
        otherNames,
        email,
        password,
        confirmPassword,
        studentID,
        school,
        phone,
        address,
        city,
        province,
        country
    } = req.body //extract fields

    //validators
    if(!type){
        return next(createError({success:false,message:"please provide a valid type", reason:"please provide a valid type"}))
    };

    if(confirmPassword !== password){
        return next(createError({success:false,message:"passwords do not match"}))
    }

    /**
     * @TODO [CHECK FIELDS]
    */

    let User = {
            //personal identity
        firstName,
        lastName,
        otherNames,
        password,
        type,
                //parent
        email,
        phone,
            //student
        studentID, 
        //locattion
        address,
        city,
        province,
        country
    };


    /**
     * SAVE BY TYPE
    */

    let id = type === "student" ? {studentID} : {"email.id":email};

   
   Users.findOne(id).then(isUser=>{
       if(isUser){
           return next(createError({code:"11000"})); //user already exists
       };
            //proceed to create new user
        Users.create({
            firstName,lastName,otherNames,email:[{id:email}],password,type,
            "phone.mobile":[{number:phone.mobile}],studentID,
            address,city,province,country
        }).then((user)=>{
            if(!user){
                return next(createError({success:false,message:"Operation Unsuccesfull",reason:"Could Not Create User"}))//no user has been created
            };

            return res.json({success:true,message:"operation successful", date:new Date()}) //return success
        }).catch(err=>next(createError(err)));

   }).catch(err=>next(createError(err)));
}; //route handler