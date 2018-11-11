process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var http = require("http");
var fs = require("fs");
var mime = require("mime");
var express = require("express");
var serviceGetMails = require(__dirname+"/mails-imap.js");
var serviceSendMails = require(__dirname+"/mails-smtp.js");



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

//POST /envoie
api.post("/envoie",serviceSendMails.sendMail);


//GET /dossiers
api.get("/dossiers",serviceGetMails.connectionSimple);
api.get("/dossiers", serviceGetMails.getDossiers);

//GET /dossiers/idDossier
api.get("/dossiers/:idDossier", serviceGetMails.connectionDossier);
api.get("/dossiers/:idDossier", serviceGetMails.getDossier);

//GET /dossier/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", serviceGetMails.connectionDossier);
api.get("/dossiers/:idDossier/:idMail", serviceGetMails.getMail);

app.use(bodyParser.json());

app.use("/api", api);

var server = http.createServer(app).listen(PORT);

var io = require("socket.io")(server);

serviceGetMails.setIo(io);

console.log("server started at port " + PORT);