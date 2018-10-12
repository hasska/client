'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = module.exports = loopback();

var swStats = require('swagger-stats');
//var apiSpec = require('swagger.json');
//app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer().any());

app.start = function() {
  // start the web server

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
