require("dotenv").config();
require("./lib").DB.conn
const {auth} = require("./lib");
const ApiService = require("moleculer-web");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const setup = require("./config");
const path = require("path");
const morgan = require("morgan");

const APIRoutes = require('./api'); //import api routes
const ClientRoutes = require("./routes");

// setup.serviceConfig.mixins.push(ApiService); //create global broker object
// setup.serviceConfig.settings.use.push(APIRoutes); //register routes

// const svc = setup.broker.createService(setup.serviceConfig); //create service instance

const app = express(); //create aplogininstance
app.use(morgan("dev"));
app.set("view engine","ejs"); //seloginview engine
app.set("views",path.join(__dirname,"views")); //set views path
app.use(cors()); //set cross origin request headers
app.use(bodyParser.json()); //parse json bodies
app.use(bodyParser.urlencoded({extended:false}));
//passport config
app.use(auth.initialize());
auth.localStretegy();
auth.jwtStrategy()
app.use("/",ClientRoutes);
app.use("/api/v1",APIRoutes);
// app.use("/api/v1",svc.express()); //register broker


app.use("/static",express.static(path.join(__dirname,"static"))); //set dir for static files

app.use(setup.catch404); // catch 404 errors
app.use(setup.errorHandler); //main error handler

module.exports = {app,broker:setup.broker}; //expose app and broker