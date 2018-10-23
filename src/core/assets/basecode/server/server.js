'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const swStats = require('swagger-stats');
const express = require('express');
const path = require('path');

var app = module.exports = loopback();

//var apiSpec = require('swagger.json');
//app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer().any());

app.get("/", express.static(path.join(__dirname, "./client/uploads")));

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./client/uploads");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
});
  
var upload = multer({
     storage: Storage
 }).array("file", 10); //Field name and max count

app.start = function() {
  // start the web server

  app.post("/upload", function(req, res) {
    upload(req, res, function(err) {

    if (err)
      return res.end("Something went wrong!");
    return res.end(JSON.stringify(req.files[0]));
  });
 });

  return app.listen(function() {
    app.emit('started');

    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      app.use(swStats.getMiddleware({swaggerSpec:baseUrl+"/explorer/swagger.json"}));
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
