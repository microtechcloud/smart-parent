const mongoose = require("mongoose");
const {UserSchema,ExerciseSchema,AssignmentSchema,TestSchema,ExaminationSchema,SchoolSchema, PushTokenSchema, SubscriptionSchema, SMSNotificationSchema, ArticleSchema} = require ("../methods");

const Users = mongoose.model("Users",UserSchema);
const Exercises = mongoose.model("Exercises",ExerciseSchema);
const Assignments = mongoose.model("Assignments",AssignmentSchema);
const Tests = mongoose.model("Tests", TestSchema);
const Examinations = mongoose.model("Examinations",ExaminationSchema);
const Schools = mongoose.model("Schools",SchoolSchema);
const PushTokens = mongoose.model("PushTokens", PushTokenSchema);
const Subscriptions = mongoose.model("Subscriptions", SubscriptionSchema);
const SMSNotification = mongoose.model("SMSNotifications", SMSNotificationSchema);
const Article = mongoose.model("Articles",ArticleSchema);

module.exports = {Users,Exercises,Assignments,Tests,Examinations,Schools, PushTokens, Subscriptions, SMSNotification, Article};