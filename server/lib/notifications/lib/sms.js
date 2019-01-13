const {Users,Subscriptions,SMSNotification}  = require("../../database").DB;
const uuid = require("uuid/v4")

const redis = require("redis");
const client = redis.createClient();
const request = require("request");



let userData = {
    username:"lwendolee",
    password:"Welcome1",
    senderid:undefined,
    orgid:"172",
    jobid:undefined,
    // msisdn:260950482560,
    message:undefined
}


module.exports  = function(_sender,_contacts,config,cb){

    let contacts;
    let sender;
    let startTime;
    let endTime;
    let currentlyProcessing;
    let length;
    let isJobPaused;
    let message;

    // if(config.jobid){
    //     client.get()
    // }

    _contacts.length ? contacts = _contacts : contacts = [];
    _sender ? sender = _sender : "5c34c61f98ede6368afe5941";
    startTime = new Date();
    currentlyProcessing = 0;
    length = contacts.length;
    !config.message ? message = "" : config.message;
    let progress = []

SMSNotification.create({
        jobId:uuid(),
        sender,
        contacts,
        message,
        length,
        currentlyProcessing,
        startTime
       
    }).then(SMSJob=>{

            if(!SMSJob){
                return cb({success:false})
            }
            //prepare cache
            // client.set()
            //start processing
            config.id = SMSJob.jobId

        sendBulkSMS(contacts,currentlyProcessing,config, progress, (err)=>{

                        cb(err)
            });

    }).catch(err=>cb(err))

}


function sendBulkSMS(contactList,index,data,responses,cb){


    if(contactList.length && index < contactList.length-1){
        //processing sms

        update(index,contactList.length -1,data.id)
        let num = `260${contactList[index]}`
       return  request.post(`https://apps.zamtel.co.zm/zamtelbulksms/FetchSMSEntryP?username=lwendolee&password=Welcome1&senderid=SMTParent&orgid=172&jobid=zamtest1234&msisdn=${num}&message=${data.message}`,function(err,body,response){

            if(err){
                
               //handle errors
               console.log(err)
            };
           console.log(num)
            index += 1
            // console.log(body)
            // console.log(response)
           sendBulkSMS(contactList,index,data,responses,cb);
        });
        
    }
    update(index,contactList.length -1,data.id)
    return cb({status:"done batch processing for "+ data.id + " at index "+ index})
                    ;
}



function update(index,total, id){

    if(index === 0){
        console.log("batch processing started for", id, "at", index);
    };

    if(index === total/2 ){
        console.log("batch processing reached halfway for", id, "at", index)
    };

    if(index === total){
        console.log("batch processing ended for",id, "at", index)
    }
};