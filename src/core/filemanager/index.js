/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bodyParser = require('body-parser');
const cors = require('cors');
const utilities = require('./src/utilities');

module.exports = {
    serve: function (app) {

		const server = app.express;

		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(bodyParser.json());

		server.use(cors());
		server.options('*', cors());

		server.get('/', function(req, res) {
		    res.json({ message: 'hooray! welcome to our api!' });   
		});

		server.post('/read/directory', function(req, res) {
			utilities.readDir(req,res,app);				
		});

		server.post('/make/directory', function(req, res) {
			utilities.makeDir(req,res,app);				
		});

		server.post('/rename/directory', function(req, res) {
			utilities.mvDir(req,res,app);				
		});

		server.post('/delete/directory', function(req, res) {
			utilities.rmDir(req,res,app);				
		});

		server.post('/export/directory', function(req, res) {
			utilities.expDir(req,res,app);				
		});

		server.post('/read/file', function(req, res) {
			utilities.readFile(req,res,app);				
		});

		server.post('/make/file', function(req, res) {
			utilities.makeFile(req,res,app);				
		});

		server.post('/rename/file', function(req, res) {
			utilities.mvFile(req,res,app);				
		});

		server.post('/delete/file', function(req, res) {
			utilities.rmFile(req,res,app);				
		});

		server.post('/export/file', function(req, res) {
			utilities.expFile(req,res,app);				
		});

	}
}

