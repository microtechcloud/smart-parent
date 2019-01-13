const express = require('express');
const router = express.Router();
const passport = require("passport");

const {home} = require("./home");
const {login,register,authenticateRequests,forgotPassword} = require('./authentication');
const UserHandler = require("./users");
const { notifications } = require("./notifications");
const publications = require("./publications")


/**
 * HOME or /
*/

router.get("/",home.client.get);

/**
 * AUTHENTICATION
*/

//REGISTER CLIENT
router.get("/auth/register",register.client.get);

router.post("/auth/register",register.client.post);

//LOGIN ClIENT
router.get('/auth/login',login.client.get);

router.post('/auth/login',login.client.post);

//AUTHENTICATE REQUEST
router.get("/authentication/client",authenticateRequests.client.get);

//FORGOT PASSWORD
router.post("/auth/forgotpassword",forgotPassword.client.post);

/**
 * USERS
*/

router.get("/users",passport.authenticate("jwt", {session:false}),UserHandler);

/**
 * NOTIFICATIONS
*/

router.post("/notifications",passport.authenticate("jwt", {session:false}),notifications.client.post);


/**
 * PUBLICATIONS
*/

    //create
router.post("/publications/articles",passport.authenticate("jwt", {session:false}),publications.articles.post);

    //delete
router.delete("/publications/articles",passport.authenticate("jwt", {session:false}),publications.articles.delete);

    //modify
router.put("/publications/articles",passport.authenticate("jwt", {session:false}),publications.articles.put);

    //fetch
router.get("/publications/articles",passport.authenticate("jwt", {session:false}),publications.articles.get);

module.exports = router;