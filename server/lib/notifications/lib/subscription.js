const {Users,Subscriptions,PushTokens}  = require("../../database").DB;

let error = {
    message:"operation not successful"
};

let success = {
    message:"operation was successful"
}

/**
 * CREATE SUBSCRIPTION
*/

exports.create = function(type,topic,tokens,cb){
   
   return Subscriptions.create({type,topic,"subscribers.push":tokens}).then(sub=>{
        if(!sub){
            return cb({success:false,message:error.message, reason:"could not create subscription"})
        };

        return cb(null,{success:true,message:success.message, payload:sub});
    }).catch(err=>cb(err));
};

/**
 * SUBSCRIPTIONS
*/


exports.subscribe = function(topic,_tokens,cb){
    
    let tokens;

    if(!Array.isArray(tokens)){

        tokens = [];

        tokens.push(_tokens);
    }

    Subscriptions.findOne({})
        .then(_topic=>{
            if(!_topic){
                return cb(error);
            };

            //susbscribe phone to notifications
            _topic._push(...tokens);

            _topic.save(function(err){
                if(err){
                    return cb(err);
                };

                return cb(null,success);
            })

        }).catch(err=>cb(err))
}

/**
 * UNSUBSCRIBE
*/


exports.unsubscribe = function(topic,token,cb){

    return Subscriptions.findOne({topic}).then(sub=>{
        if(!sub){
            return cb({success:false,message:error.message,reason:"Topic Not Found"})
        };

        
        let index = sub.subscribers.indexOf(token);

        sub.subscribers.splice(index,1);

        sub.save(function(err){
            if(err){
                return cb(err);

            };

            return cb(null)
        })


        
    }).catch(err=>cb(err))
}

//check if user is authenticated
exports.isUser_authenticated = function(id,cb){

    !id || typeof(id) !== "string" ? cb(new TypeError("id should be string")) : 

    Users.findOne({"email.id":id})
        .then(user=>{
            if(!user){
                return cb(error);
            };

            return cb(null,user);
        })
            .catch(err=>cb(err))
}