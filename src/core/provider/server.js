/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const bodyParser = require('body-parser');
const cors = require('cors');
const projects = require('../utilities/projects');
const models = require('../utilities/models');
const shell = require('shelljs');

module.exports = {
    createServer: function (app) {
		const server = app.express;

		server.use(bodyParser.urlencoded({ extended: true }));
		server.use(bodyParser.json());

		server.use(cors());
		server.options('*', cors());

		server.get('/', function(req, res) {
		    res.json({ message: 'hooray! welcome to our api!' });   
		});

		server.post('/projects/create', function(req, res) {
			projects.createProject(req,res,app);				
		});

		server.get('/projects/overall', function(req, res) {
			projects.getProjects(req,res,app);				
		});

		server.get('/projects/getItem', function(req, res) {
			projects.getProjectById(req,res,app);				
		});

		server.get('/projects/removeItem', function(req, res) {
			projects.removeProject(req,res,app);				
		});

		server.post('/projects/updateConfiguration', function(req, res) {
			projects.setConfiguration(req,res,app);				
		});

		server.post('/databases/create', function(req, res) {
			databases.createDatabase(req,res,app);				
		});

		server.get('/databases/overall', function(req, res) {
			databases.getDatabases(req,res,app);				
		});

		server.get('/databases/getItem', function(req, res) {
			databases.getDatabaseById(req,res,app);				
		});

		server.get('/databases/removeItem', function(req, res) {
			databases.removeDatabase(req,res,app);				
		});

		server.post('/databases/updateConfiguration', function(req, res) {
			databases.setConfiguration(req,res,app);				
		});

		server.post('/models/create', function(req, res) {
			models.createModel(req,res,app);				
		});

		server.get('/models/getItem', function(req, res) {
			models.getModel(req,res,app);				
		});

		server.post('/models/removeItem', function(req, res) {
			models.removeModel(req,res,app);				
		});

		server.get('/models/overall', function(req, res) {
			models.getModels(req,res,app);				
		});

		server.get('/models/configs', function(req, res) {
			models.getModelsConfigs(req,res,app);				
		});
	},
	logger: function(app){
		
	},
	run: function(app){
		app.express.listen(app.port, () => console.log('Server Started ...')); 
	}
}

