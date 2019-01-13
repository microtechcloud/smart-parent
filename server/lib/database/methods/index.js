const {UserSchema,ExaminationSchema,TestSchema,AssignmentSchema,ExerciseSchema,SchoolSchema, PushTokenSchema, SubscriptionSchema, SMSNotificationSchema, ArticleSchema} = require("../schema");
const bcrypt = require("bcrypt");

UserSchema.pre("save",function(done){
    let self = this;
    let salt = 10;
    let password;

    password = self.password;
    bcrypt.hash(password,salt,function(err,hash){
            if(err){
                return done(err);
            };

            self.password = hash

            done(null);
    })
});


UserSchema.methods.isPasswordValid = function(password,done){
    console.log("verifying password")
    let _password;
    _password = this.password;
        console.log("_password", _password)
    if(password !== _password){
        console.log("verifcation false")
        return done(false);
    };

    console.log("passsword verified")
    return done(true);
}

// function ParentSchemaHandler(done){
//     let self = this;

//     /**
//      * PHONE
//     */
//     //make sure contacts are saved right or else null them
//     if(!self.phone.landline.number){
//         self.phone.landline = null;
//     };

//     if(self.phone.other.length){

//         for(contact in self.phone.other){

//             if(!contact.number){
//                 let i = self.phone.other.indexOf(contact);

//                 self.phone.other.pop(i);
//             };
//         };
//     };

//     //check if email exists

//     //call done
//     done();

// };

module.exports = {UserSchema,ExaminationSchema,TestSchema,AssignmentSchema,ExerciseSchema,SchoolSchema, PushTokenSchema, SubscriptionSchema, SMSNotificationSchema, ArticleSchema};