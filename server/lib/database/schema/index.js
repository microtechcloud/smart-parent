const mongoose = require("mongoose");
const Schema = mongoose.Schema;



/**
 * SMART PARENT USER 
*/

const UserSchema = new Schema({
    //identity
    firstName:{type:String,lowercase:true,required:true},
    lastName:{type:String,lowercase:true,required:true},
    otherNames:{type:String,lowercase:true},
    uuid:{type:String,lowercase:true},
    profilePic:[{type:Schema.Types.ObjectId,ref:"Images",currentImage:false}],
    password:{type:String,required:true},

    //type of user
    type:{
            type:String,
            required:true,
            enum:["parent","guardian","student","admin"]
        },

    //contact
    email:[{
        id:{type:String,lowercase:true},
        confirmed:{type:Boolean,default:false}
    }],
    phone:{
        mobile:[{number:{type:String},confirmed:{type:Boolean, default:false}}],
        landline:[{number:{type:String},confirmed:{type:Boolean, default:false}}],
        other:[{number:{type:String},confirmed:{type:Boolean, default:false}}]
    },

    //student ID
    studentID:{type:String},
        //location
        address:{type:String,lowercase:true,required:true},
        city:{type:String,lowercase:true,required:true},
        province:{type:String,lowercase:true,required:true},
        country:{type:String,lowercase:true,required:true},
            //features
            exercises:[],
            assignments:[],
            tests:[],
            examinations:[],
            generalClassAttendance:[],
            classSubjectAttendance:[],
            schools:[{enrolled:{type:Date,default:Date.now},schoolCode:{type:Schema.Types.ObjectId,ref:"Schools"}}],
            currentSchool:{
                enrolled:{type:Date},
                schoolCode:{type:Schema.Types.ObjectId,ref:"Schools"}
            },
            pushToken:[{type:Schema.Types.ObjectId,ref:"PushTokens"}],
            notificationsMessages:[],
            notifificationSubscriptions:[{type:Schema.Types.ObjectId,ref:"Subscriptions"}],  //subscriptions
            issues:[],
            readArticles:[{type:Schema.Types.ObjectId,ref:"Articles"}],
            postedArticles:[{type:Schema.Types.ObjectId,ref:"Articles"}],
            messages:[],
            guidanceCouncillors:[],
            parents:[{type:Schema.Types.ObjectId,ref:"Users"}],
            students:[{type:Schema.Types.ObjectId,ref:"Users"}],
});



/**
 * ARTICLES
*/

const ArticleSchema = new Schema({
    writer:{type:Schema.Types.ObjectId,ref:"Users"},
    cover:{type:String},
    postedOn:{type:Date, default:Date.now},
    deleted:{type:Boolean,default:false},
    deletedOn:{type:Date},
    tags:[],
    body:{type:String,},
    description:{type:String, max:120},
    title:{type:String,max:50},
    readBy:[{type:Schema.Types.ObjectId,ref:"Users"}]
});

/**
 * SUBSCRIPTIONS
*/

const SubscriptionSchema = new Schema({
    type:{enum:["primary","promotions","updates"]},
    topic:{enum:["default","attendance","reports","assignment","homework","exams","tests"]},
    subscribers:
        {
            // _sms:[{type:Schema.Types.ObjectId, ref:"Users"}],
            _push:[{type:Schema.Types.ObjectId, ref:"PushTokens"}],
            // _email:[{type:Schema.Types.ObjectId, ref:"Users"}]
    }
})

/**
 *  NOTIFICATIONS
*/

const PushTokenSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:"Users"},
    deviceInfo:Object
});

// const EmailNotificationSchema = new Schema({
//     owner:{type:Schema.Types.ObjectId,ref:"Users"},
//     email:String,
//     messages:[]
// });

const SMSNotificationSchema = new Schema({

    jobId:{type:String, required:true, unique:true},
    sender:{type:Schema.Types.ObjectId,ref:"Users"},
    contacts:[],
    length:{type:Number,required:true},
    message:{type:String, max:120},
    startTime:{type:Date, default:Date.now},
    isPaused:{type:Boolean, default:false},
    endTime:{type:Date,},
    currentProcessing:{type:Number}

});




/**
 * STAFF 
*/

const StaffSchema = new Schema({
    //identity
        //location
            //features
});


/**
 * GUIDANCE COUNCILLORS 
*/

const GuidanceCouncillorSchema = new Schema({
    //identity
        //location
            //features
});

/**
 * DEVELOPERS 
*/

const DevelopersSchema = new Schema({
    //identity
        //location
            //features
});


/**
 * EXERCISES  
*/
const ExerciseSchema = new Schema({
    dateIssued:{type:Date,default:Date.now},
    marksRecieved:{type:Number,required:true},
    totalMarksIssued:{type:Number,required:true},
    issuedBy:{type:Schema.Types.ObjectId,ref:"Users"}, //ref users - teachers
    subject:{type:Schema.Types.ObjectId,ref:"Subjects"}, //ref subjects
    topic:{type:Schema.Types.ObjectId,ref:"Topics"}, //ref topics
    grade:{type:Schema.Types.ObjectId,ref:"Grades"}, //ref grades
    writtenBy:{type:Schema.Types.ObjectId}, //ref users - students
    teachersComment:{type:String,maxlength:128}, //trainers comment,
    parentAcknowledgment:{type:Boolean,default:false}, //parent acknowledged reciept of results
    prentsComment:{type:String,maxlength:128},
    term:{type:String,enum:["one","two","three"]},
    school:{type:Schema.Types.ObjectId,ref:"Schools"}

    
});

/**
 * ASSIGNMENTS  
*/
const AssignmentSchema = new Schema({
    dateIssued:{type:Date,default:Date.now},
    marksRecieved:{type:Number,required:true},
    totalMarksIssued:{type:Number,required:true},
    issuedBy:{type:Schema.Types.ObjectId,ref:"Users"}, //ref users - teachers
    subject:{type:Schema.Types.ObjectId,ref:"Subjects"}, //ref subjects
    topic:{type:Schema.Types.ObjectId,ref:"Topics"}, //ref topics
    title:{type:String},
    dueDate:{type:Date},
    grade:{type:Schema.Types.ObjectId,ref:"Grades"}, //ref grades
    writtenBy:{type:Schema.Types.ObjectId}, //ref users - students
    teachersComment:{type:String,maxlength:128}, //trainers comment,
    parentAcknowledgment:{type:Boolean,default:false}, //parent acknowledged reciept of results
    prentsComment:{type:String,maxlength:128},
    term:{type:String,enum:["one","two","three"]},
    school:{type:Schema.Types.ObjectId,ref:"Schools"}
    
});


/**
 * TESTS  
*/

const TestSchema = new Schema({
    dateIssued:{type:Date,default:Date.now},
    marksRecieved:{type:Number,required:true},
    totalMarksIssued:{type:Number,required:true},
    issuedBy:{type:Schema.Types.ObjectId,ref:"Users"}, //ref users - teachers
    subject:{type:Schema.Types.ObjectId,ref:"Subjects"}, //ref subjects
    topic:{type:Schema.Types.ObjectId,ref:"Topics"}, //ref topics
    title:{type:String},
    dueDate:{type:Date},
    grade:{type:Schema.Types.ObjectId,ref:"Grades"}, //ref grades
    writtenBy:{type:Schema.Types.ObjectId}, //ref users - students
    teachersComment:{type:String,maxlength:128}, //trainers comment,
    parentAcknowledgment:{type:Boolean,default:false}, //parent acknowledged reciept of results
    prentsComment:{type:String,maxlength:128},
    term:{type:String,enum:["one","two","three"]},
    school:{type:Schema.Types.ObjectId,ref:"Schools"}
    
});



/**
 * EXAMINATIONS  
*/

const ExaminationSchema = new Schema({
    dateIssued:{type:Date,default:Date.now},
    marksRecieved:{type:Number,required:true},
    totalMarksIssued:{type:Number,required:true},
    issuedBy:{type:Schema.Types.ObjectId,ref:"Users"}, //ref users - teachers
    subject:{type:Schema.Types.ObjectId,ref:"Subjects"}, //ref subjects
    topic:{type:Schema.Types.ObjectId,ref:"Topics"}, //ref topics
    title:{type:String},
    dueDate:{type:Date},
    grade:{type:Schema.Types.ObjectId,ref:"Grades"}, //ref grades
    writtenBy:{type:Schema.Types.ObjectId}, //ref users - students
    teachersComment:{type:String,maxlength:128}, //trainers comment,
    parentAcknowledgment:{type:Boolean,default:false}, //parent acknowledged reciept of results
    prentsComment:{type:String,maxlength:128},
    term:{type:String,enum:["one","two","three"]},
    school:{type:Schema.Types.ObjectId,ref:"Schools"}
    
});


/**
 * SCHOOLS
*/

const SchoolSchema = new Schema({
    code:{type:String,required:true},
    name:{type:String,required:true},
    location:{
        POBox:{type:String},
        district:{type:Schema.Types.ObjectId,ref:"Districts"},
        province:{type:Schema.Types.ObjectId,ref:"Provinces"},
        country:{type:Schema.Types.ObjectId,ref:"Countries"}
    }
});


/**
 * SUBJECTS
*/

const SubjectSchema = new Schema({
    name:{type:String,required:true},
    image:{type:Schema.Types.ObjectId,ref:"Images"},
    code:{type:String,required:true},
    grade:{type:String,enum:["nursery","kindergarten","reception","1","2","3","4","5","6","7","8","9","10","11","12"]}
});

const ImagesSchema = new Schema({
    metadata:[]
});

module.exports = {UserSchema,TestSchema,ExaminationSchema,AssignmentSchema,ExerciseSchema,SchoolSchema,PushTokenSchema, SubscriptionSchema, SMSNotificationSchema, ArticleSchema};