const {create,subscribe,unsubscribe,isUser_authenticated} = require("./subscription");
const sendPush = require("./push");
const sendSMS = require("./sms");

//version 1 of the API
let v1 = {};

/**
 * @return {subcriptions}
 * @param type:String || Array
 * @param pushtoken
 * @param topic
 * 
*/
v1.subscribe = subscribe;

v1.unsubscribe = unsubscribe;

v1.createSubscription = create;

v1.sendSMS = sendSMS;

v1.sendEmail =function(){}

v1.sendPush = sendPush

v1.sendMultiple = function(){}

v1.isUser_authenticated = isUser_authenticated

module.exports = v1;