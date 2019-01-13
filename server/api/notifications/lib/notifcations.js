const { createSubscription, subscribe, unsubscribe, sendEmail, sendMultiple, sendPush,sendSMS ,isUser_authenticated } = require("../../../lib/notifications");
const { PushTokens, Users } = require("../../../lib").DB.DB;

const jwt = require("jsonwebtoken")
let token;

module.exports = (req, res, next) => {
    let { reqType, subType,_smsList, notType, token, topic, payload } = req.body

    switch (reqType) {

        case "create":
            // create(notType,subType,topic,token,(err)=>console.log({err}));
            break;
        case "subscribe":
            _subscribe(req.user, topic, token, (err, results) => {

                if (err) {

                    return res.json(err)
                };

                return res.json(results)
            })
            break;
        case "unsubscribe":
            break;
        case "notification":
            // sendPush("ExponentPushToken[wcNlH4Cje7vRKD6hdZFPCI]",(err)=>res.json({success:true}))
            resolveNotification(notType,token,payload,_smsList, (err) =>err)
            res.json({ success: true })
            break;
        default:
    }

}

function genFakeNumbers(number,_total){
    let total;
    let list = []
    total = _total;

    for(let i = 0; i<total -1; i++){
        list.push(number);
    }

    return list;

}



function _subscribe(user, topic, token, cb) {
    PushTokens.findOne({ token: token }).then(_token => {

        if (_token) {
            console.log("device already exists")
            return cb({ success: false })
        };

        PushTokens.create({ token: token, owner: user._id }).then(__token => {

            if (!__token) {

                return cb({ success: false })
            }

            subscribe(topic, [__token._id], (err => {

                if (err) {
                    return cb({ success: false, message: "could not subscribe", err })
                };

                cb(null, { success: true, message: "subsribed successfully" })

            })).catch(err => {

                cb(err)
            })



        }).catch(err => {

            cb(err)
        })

    }).catch(err => {
        cb(err)
    })
}


function resolveNotification(notType,token,payload,_smsList, cb) {
    let types;
    if (Array.isArray(notType)) {

        for (let type of notType) {
            switch (type) {
                case "push":
                    sendPush(token,payload,(err)=>cb(err));
                    break;
                case "sms":
                     sendSMS(null,_smsList,{message:payload.message || ""},(err)=>console.log(err));
                    break;
                case "email":
                    break;
                default:
            }
        }
    }
}

