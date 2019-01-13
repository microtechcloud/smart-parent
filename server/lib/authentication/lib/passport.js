const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {Users} = require("../../database").DB
const jwt = require("jsonwebtoken");


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTLOGINSECRET;


exports.localStretegy = function(){
    return passport.use("local", new LocalStrategy(
    //     {
    //             usernameField:"username",
    //             passwordField:""
    // }, 
    function(username,password,done){
       console.log("username", username)
        Users.findOne({"email.id":username}).then(user=>{
            console.log("username found",user)
            if(!user){
                console.log("not user");
                return done(null,false);
            };

            console.log("validating password")
            user.isPasswordValid(user.password,function(isValid){

                if(!isValid){
                        console.log("password do not match")
                    return done({success:false,message:"password not valid"});
                };

                console.log("passwords match")
                return done(null,user)
            })

            

        }).catch(err=>done(err))

    }));
};

exports.jwtStrategy = function(){
    return passport.use("jwt", new JwtStrategy(opts,
        function(jwt_payload, done){

          Users.findOne({"email.id": jwt_payload}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
        });  
    }))
}

exports.initialize = function(){
    return passport.initialize();
};

exports.session = function(){
    return passport.session();
};