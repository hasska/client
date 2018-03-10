/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs-extra");
const Store = require('electron-store');
const shell = require('shelljs');
const logger = require('../utilities/logger');

module.exports = {
	createProject: (req,res,app) => {
		const store = new Store();
		const source = app.getAppPath()+'/src/core/assets/basecode';
		const destination = req.body.destination+'/'+req.body.name;
		
		let projects = store.get('projects');
		for(let item in projects){
			item = JSON.parse(projects[item]);
			if(item.name==req.body.name){
				res.send(app.respondToClient({
					msg: 'Name of project should be unique!',
					status: 'error'
				}));
				return;
			}
		}

		// With a callback:
		fs.ensureDir(destination, err => {
		  // dir has now been created, including the directory it is to be placed in
		  if(!err){
		  	fs.copy(source, destination, function (err) {
			    if (err){
			        console.log('An error occured while copying the folder.')
			        res.send(app.respondToClient({
						msg: 'Problem in creating function. Try again ! :(',
						status: 'error'
					}));
					return;
			    }
			    //TODO: WE have to change project title in basecode copied 
			    //TODO: Save project information in user storage
		
			    let _id = Math.floor(Math.random()*90000) + 10000;
			    let new_data = {
					id: _id,
					name: req.body.name,
					destination: destination,
					last_modified: new Date()
				};

				store.set('projects.'+_id,JSON.stringify(new_data))
				store.set('currentProject',new_data);
				
			    res.send(app.respondToClient({
					msg: 'Your project created successfully :)',
					data: new_data,
					status: 'success'
				}));

			});
		  } else {
		  	res.send(app.respondToClient({
				msg: 'This folder destination dosnt exist ! :(',
				status: 'error'
			}));
		  }
		})
	},
	getProjects: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('projects'),
			status: 'success'
		}));
	},
	getProjectById: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('projects.'+req.query.id),
			status: 'success'
		}));
	},
	removeProject: (req,res,app) => {
		const store = new Store();
		let project = store.get('projects.'+req.body.project.id);
		
		fs.remove(JSON.parse(project).destination, err => {
		   
		    if (err) {
		    	res.send(app.respondToClient({
					msg: err,
					status: 'error'
				}));
				return;
		    }

    	    store.delete('projects.'+req.body.project.id);
	  		res.send(app.respondToClient({
				msg: 'Project deleted successfully',
				status: 'success'
			}));
		})
	},
	setConfiguration: (req,res,app) => {
		const store = new Store();
		store.set('projects.'+req.body.data.id,JSON.stringify(req.body.data));
  		res.send(app.respondToClient({
			msg: 'Project updated successfully',
			status: 'success'
		}));
	},
	run: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		console.log(store.get('currentProject'))

		shell.config.execPath = project.destination;
		
		shell.cd(project.destination);

	  	logger.log('node start');

		let run = shell.exec('forever start -al '+project.destination+'/logs/forever.log -ao '+project.destination+'/logs/out.log -ae '+project.destination+'/logs/err.log server/server.js', function(code, stdout, stderr) {
		  //console.log('Exit code:', code);
		  //console.log('Program output:', stdout);
		  //console.log('Program stderr:', stderr);
	  	  if(code==0){
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'START_APP'})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'START_APP'})
	  	  }
		  //HERE WE CAN DETECT BUILD SUCCESS OR FAILED WITH STDERR AND OUT

		});

		run.stdout.on('data', function(data) {
		  	logger.log(data);
		});
	},
	stop: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');

		shell.config.execPath = project.destination;
	
		shell.cd(project.destination);

	  	logger.log('node stop');

		let run = shell.exec('forever stop server/server.js', function(code, stdout, stderr) {
		  //console.log('Exit code:', code);
		  //console.log('Program output:', stdout);
		  //console.log('Program stderr:', stderr);
	  	  //logger.log(code);
	  	  if(code==0){
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'STOP_APP'})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'STOP_APP'})
	  	  }

		});

		run.stdout.on('data', function(data) {
		  	logger.log(data);
		});
	},
	clean: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		shell.config.execPath = project.destination;
	
		shell.cd(project.destination);

	  	logger.log('npm clean');

		fs.emptyDir(project.destination+'/node_modules', err => {
		  if (err){
		   logger.log(err.toString())
		   callback({"status":"error",step:'CLEAN_APP'});
		  }
		  else {
		  	logger.log('Project cleaned successfully :)');
		    callback({"status":"success",step:'CLEAN_APP'});
		  }
		})

		fs.emptyDir(project.destination+'/dashboard/node_modules', err => {
		  if (err) {
		  	logger.log(err.toString())
		    callback({"status":"error",step:'CLEAN_ADMIN_APP'});
		  }
		  else {
		  	logger.log('Project Dashboard cleaned successfully :)');
		    callback({"status":"success",step:'CLEAN_ADMIN_APP'});
		  }
		})
	},
	buildDashboard(callback){
		const store = new Store();
		let project = store.get('currentProject');
		shell.config.execPath = project.destination;
	
		shell.cd(project.destination);

	  	logger.log('npm install');

		shell.cd(project.destination+'/dashboard');

		let run = shell.exec('npm install', function(code, stdout, stderr) {
		  //console.log('Exit code:', code);
		  //console.log('Program output:', stdout);
		  //console.log('Program stderr:', stderr);
	  	  //logger.log(code);
	  	  if(code==0){
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'BUILD_DASHBOARD_APP'})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'BUILD_DASHBOARD_APP'})
	  	  }

		});

		run.stdout.on('data', function(data) {
		  	logger.log(data);
		});

	},
	build: (callback) => {
		const store = new Store();
		console.log(store.get('currentProject'))
		let project = store.get('currentProject');
		shell.config.execPath = project.destination;
	
		shell.cd(project.destination);

	  	logger.log('npm install');

		let run = shell.exec('npm install', function(code, stdout, stderr) {
		  //console.log('Exit code:', code);
		  //console.log('Program output:', stdout);
		  //console.log('Program stderr:', stderr);
	  	  //logger.log(code);
	  	  if(code==0){
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'BUILD_APP'})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'BUILD_APP'})
	  	  }

		});

		run.stdout.on('data', function(data) {
		  	logger.log(data);
		});

		shell.cd(project.destination+'/dashboard');

		let run_dashboard = shell.exec('npm install', function(code, stdout, stderr) {
		  //console.log('Exit code:', code);
		  //console.log('Program output:', stdout);
		  //console.log('Program stderr:', stderr);
	  	  if(code==0){
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'BUILD_DASHBOARD_APP'})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'BUILD_DASHBOARD_APP'})
	  	  }
		});

		run_dashboard.stdout.on('data', function(data) {
		  	logger.log(data);
		});
	}
}