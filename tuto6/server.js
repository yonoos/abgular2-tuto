var http = require("http");
var fs = require("fs");
var mime = require("mime");
var express = require("express");
var serviceMails = require(__dirname+"/get-mails.js");


var logger = require("morgan");
var favicon = require("serve-favicon");
var serveStatic = require("serve-static");
var bodyParser = require("body-parser");


var PORT="8080";
//<>  

var app = express();
app.use(logger(":method :url"));
app.use(serveStatic(__dirname+"/app"));
app.use(favicon(__dirname + "/app/favicon.ico"));

var api = express();

serviceMails.generateMails();

//GET /dossiers
api.get("/dossiers", serviceMails.getDossiers);

//GET /dossiers/idDossier
api.get("/dossiers/:idDossier", serviceMails.getDossier);

//GET /dossier/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", serviceMails.getMail);

app.use(bodyParser.json());

//POST /envoie
api.post("/envoie",serviceMails.sendMail);

app.use("/api", api);

http.createServer(app).listen(PORT);

console.log("server started at port " + PORT);