#!/usr/local/bin/node

/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const fs = require("fs-extra");
const Store = require('electron-store');
const shell = require('shelljs');
const logger = require('../utilities/logger');
const wget = require('node-wget');
const symlinkDir = require('symlink-dir')
const path = require('path')

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

			    let _id = Math.floor(Math.random()*90000) + 10000;
			    let new_data = {
						id: _id,
						name: req.body.name,
						destination: destination,
						build: false,
						last_modified: new Date(),
						configs: {
							"SERVICE_PORT": 8080,
							"SERVICE_HOST":"127.0.0.1",
							"CORE_PORT": 8000,
							"CORE_HOST": "127.0.0.1",
							"FAV_ICON":destination+"/dashboard/public/favicon.png",
							"authentication": false,
							"enviroment":"dev",
							admin: {
								"PORT":3006,
								"HOST":"127.0.0.1",
								"PROJECT_BRAND":"Haska",
								"DISABLE_ADMIN":false,
								"default_username":"admin@haska.io",
								"default_password":"qwertyuiop"
							}
						}
					};

					store.set('projects.'+_id,JSON.stringify(new_data))
					store.set('currentProject',new_data);

					let jsConfigsJson = {
						"PORT":3006,
						"SERVICE_PORT": 8080,
						"CORE_PORT": 8000,
						"PROJECT_PATH":destination,
						"FAV_ICON":destination+"/dashboard/public/favicon.png",
						"PROJECT_BRAND":req.body.name,
						"DISABLE_ADMIN":false,
						"HOST":"127.0.0.1",
						"SERVICE_HOST":"127.0.0.1",
						"CORE_HOST": "127.0.0.1"
					};
					let jsConfigData = 'export const configs = '+JSON.stringify(jsConfigsJson);

					fs.ensureFile(destination+'/dashboard/.env',(err) => {
						fs.writeFileSync(destination+'/dashboard/.env', "PORT=3006");
					});

					fs.writeFileSync(destination+'/dashboard/src/configs.js', jsConfigData);

					//2COPY MODEL-CONFIG & MODELS FOLDER
					//TODO: WE have to change project title in package.json
					fs.readJson(destination+'/package.json', (err, packageObj) => {
						let tmp = packageObj;
						tmp['name'] = req.body.name;
						fs.writeJson(destination+'/package.json',tmp)
						.then(() => {
							res.send(app.respondToClient({
								msg: 'Your project created successfully :)',
								data: new_data,
								status: 'success'
							}));
						})
						.catch(err => {
							logger.log(err.toString());
							res.send(app.respondToClient({
								msg: 'Problem in creating function. Try again ! :(',
								status: 'error'
							}));
						})
					});
				});
		  } else {
		  	res.send(app.respondToClient({
					msg: 'This folder destination dosnt exist ! :(',
					status: 'error'
				}));
		  }
		})
	},

	createProjectIPC: (app,data,callback) => {
		const store = new Store();
		const source = app.getAppPath()+'/src/core/assets/basecode';
		const destination = data.destination+'/'+data.name;

		const source_api = app.getAppPath()+'/src/core/assets/modules/api/node_modules';
		const destination_api = data.destination+'/'+data.name+'/node_modules';

		const source_admin = app.getAppPath()+'/src/core/assets/modules/admin/node_modules';
		const destination_admin = data.destination+'/'+data.name+'/dashboard/node_modules';

		let projects = store.get('projects');
		for(let item in projects){
			item = JSON.parse(projects[item]);
			if(item.name==data.name){
				callback({
					msg: 'Name of project should be unique!',
					status: 'error'
				})
				return;
			}
		}

		// With a callback:
		fs.ensureDir(destination, err => {
		  // dir has now been created, including the directory it is to be placed in
			//  if(!err){
			fs.copy(source, destination, function (err) {
				
				symlinkDir(source_api, destination_api)
				  .then(result => {
				    console.log(result)
				    //> { reused: false }

				    return symlinkDir(source_api,destination_api)
				  })
				  .then(result => {
				  
			  	  symlinkDir(source_admin, destination_admin)
				  .then(result => {
				    console.log(result)
				    //> { reused: false }

				    return symlinkDir(source_admin,destination_admin)
				  })
				  .then(result => {

					    let _id = Math.floor(Math.random()*90000) + 10000;
					    let new_data = {
							id: _id,
							name: data.name,
							destination: destination,
							build: false,
							last_modified: new Date(),
							configs: {
								"SERVICE_PORT": 8080,
								"SERVICE_HOST":"127.0.0.1",
								"CORE_PORT": 8000,
								"CORE_HOST": "127.0.0.1",
								"FAV_ICON":destination+"/dashboard/public/favicon.png",
								"authentication": false,
								"enviroment":"dev",
								admin: {
									"PORT":3006,
									"HOST":"127.0.0.1",
									"PROJECT_BRAND":"Haska",
									"DISABLE_ADMIN":false,
									"default_username":"admin@haska.io",
									"default_password":"qwertyuiop"
								}
							}
						};

						store.set('projects.'+_id,JSON.stringify(new_data))
						store.set('currentProject',new_data);

						let jsConfigsJson = {
							"PORT":3006,
							"SERVICE_PORT": 8080,
							"CORE_PORT": 8000,
							"PROJECT_PATH":destination,
							"FAV_ICON":destination+"/dashboard/public/favicon.png",
							"PROJECT_BRAND":data.name,
							"DISABLE_ADMIN":false,
							"HOST":"127.0.0.1",
							"SERVICE_HOST":"127.0.0.1",
							"CORE_HOST": "127.0.0.1"
						};
						let jsConfigData = 'export const configs = '+JSON.stringify(jsConfigsJson);

						fs.ensureFile(destination+'/dashboard/.env',(err) => {
							fs.writeFileSync(destination+'/dashboard/.env', "PORT=3006 \n BROWSER=none");
						});

						fs.writeFileSync(destination+'/dashboard/src/configs.js', jsConfigData);

						//COPY BUILT-IN MODELS MODEL-CONFIG & MODELS FOLDER

						const source_models = app.getAppPath()+'/src/core/assets/defaults/'+data.modelDefault;
						const destination_models = data.destination+'/'+data.name+'/common';
						const destination_admin_models = data.destination+'/'+data.name+'/dashboard/src/models/common';
						const destination_models_config = data.destination+'/'+data.name+'/server';
						const destination_admin_models_config = data.destination+'/'+data.name+'/dashboard/src/models'

						fs.copy(source_models, destination_models, function (err) {
							if(err)
								logger.log(err.toString());
						});
						
						fs.copy(source_models, destination_admin_models, function (err) {
							if(err)
								logger.log(err.toString());
						});

						fs.createReadStream(source_models+'/model-config.json').pipe(fs.createWriteStream(destination_models_config+'/model-config.json'));
						fs.createReadStream(source_models+'/model-config.json').pipe(fs.createWriteStream(destination_admin_models_config+'/model-config.json'));


						fs.copy(source_models+'/model-config.json', destination_admin_models_config, function (err) {
							if(err)
								logger.log(err.toString());
						});


						//TODO: WE have to change project title in package.json
						fs.readJson(destination+'/package.json', (err, packageObj) => {
							let tmp = packageObj;
							tmp['name'] = data.name;
							fs.writeJson(destination+'/package.json',tmp)
							.then(() => {
								callback({
									msg: 'Your project created successfully :)',
									data: new_data,
									status: 'success'
								})
							})
							.catch(err => {
								logger.log(err.toString());
								callback({
									msg: 'Problem in creating function. Try again ! :(',
									status: 'error'
								})
							})
						})


						}).catch(err => {
							 callback({
								 msg: 'Problem in creating function. Try again ! :(',
								 status: 'error'
							 })
							 return;
						 })


					 }).catch(err => {
						 callback({
							 msg: 'Problem in creating function. Try again ! :(',
							 status: 'error'
						 })
						 return;
					 })

					 //fs.copy(source, destination,{ dereference: true } , function (err) {

						//});
					});
				});
			  /*} else {
					callback({
						msg: 'This folder destination dosnt exist ! :(',
						status: 'error'
					})
			  }*/
	},
	getProjects: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('projects'),
			status: 'success'
		}));
	},
	getProjectsIPC: (callback) => {
		const store = new Store();
		callback(store.get('projects'));
	},
	getProjectById: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('projects.'+req.query.id),
			status: 'success'
		}));
	},
	removeProject: (arg,callback) => {

		const store = new Store();
		let project = store.get('currentProject');

		fs.remove(project.destination, err => {

		    if (err) {
		    	callback('error');
				return;
		    }

    	    store.delete('projects.'+project.id);
	  		callback('success');
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

		shell.config.execPath = project.destination;

		shell.cd(project.destination);

	  	logger.log('node start');

		shell.exec('killall node', function(code, stdout, stderr) {
			logger.log(stdout);
			logger.log(stderr);
		

		let stopAdmin = shell.exec('node_modules/forever/bin/forever stop dashboard/node_modules/react-scripts/scripts/start.js', function(code, stdout, stderr) {

		  let stop = shell.exec('node_modules/forever/bin/forever stop server/server.js', function(code, stdout, stderr) {

			let run = shell.exec('node_modules/forever/bin/forever start -al '+project.destination+'/logs/forever.log -ao '+project.destination+'/logs/out.log -ae '+project.destination+'/logs/err.log server/server.js', function(code, stdout, stderr) {
		  	  if(code==0){
		  	  	//logger.log(stdout);
						setTimeout(function(){
							wget('http://'+project.configs.SERVICE_HOST+':'+project.configs.SERVICE_PORT+'/explorer/swagger.json', function(){
								setTimeout(function(){

									shell.exec('node_modules/spectacle-docs/bin/spectacle.js -l favicon.png -f docs.html swagger.json',function(code, stdout, stderr) {
										console.log(stdout)
										logger.log(stdout)
										logger.log(stderr)
										setTimeout(function() {
											callback({"status":"success",step:'START_APP',data:stdout })
										},15000)
									});

									shell.cd(project.destination+'/dashboard');


									let runAdmin = shell.exec('../node_modules/forever/bin/forever start node_modules/react-scripts/scripts/start.js', function(code, stdout, stderr) {

								  	  if(code==0){
								  	  	logger.log(stdout);
								  	  	callback({"status":"success",step:'START_APP',data:stdout })
								  	  }
								  	  else{
								  	  	logger.log(stderr)
								  	  	callback({"status":"error",step:'START_APP',data:stderr })
								  	  }
									});

									runAdmin.stdout.on('data', function(data) {
									  	logger.log(data);
									});
								


								},2000);
							});
						},6000);
		  	  }
		  	  else{
		  	  	logger.log(stderr)
						callback({"status":"error",step:'START_APP',data:stderr })
		  	  }
			});

			run.stdout.on('data', function(data) {
			  	logger.log(data);
			});
		});
	  });
	});

	},
	stop: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');

		shell.config.execPath = project.destination;

		shell.cd(project.destination);

	  	logger.log('node stop');

		let run = shell.exec('node_modules/forever/bin/forever stop server/server.js', function(code, stdout, stderr) {
		  //console.log('Exit code:', code);
		  //console.log('Program output:', stdout);
		  //console.log('Program stderr:', stderr);
	  	  //logger.log(code);
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'STOP_APP',data:stdout})
	  	  	
	  	  	logger.log(stderr)

		});

		run.stdout.on('data', function(data) {
		  	logger.log(data);
		});

		shell.cd(project.destination+'/dashboard');


		let runAdmin = shell.exec('../node_modules/forever/bin/forever stop node_modules/react-scripts/scripts/start.js', function(code, stdout, stderr) {

	  	  if(code==0){
	  	  	logger.log(stdout);
	  	  	callback({"status":"success",step:'STOP_APP',data:stdout })
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'STOP_APP',data:stderr })
	  	  }
		});

		runAdmin.stdout.on('data', function(data) {
		  	logger.log(data);
		});

		shell.exec('killall node', function(code, stdout, stderr) {
			logger.log(stdout);
			logger.log(stderr);
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
		    //callback({"status":"success",step:'CLEAN_APP'});
		  }
		})

		fs.emptyDir(project.destination+'/dashboard/node_modules', err => {
		  if (err) {
		  	logger.log(err.toString())
		    callback({"status":"error",step:'CLEAN_ADMIN_APP'});
		  }
		  else {
		  	logger.log('Project Dashboard cleaned successfully :)');
				let tmp = project;
				tmp['build'] = false;
				store.set('projects.'+project.id,JSON.stringify(tmp))
				store.set('currentProject',tmp);
		    callback({"status":"success",step:'CLEAN_ADMIN_APP',project:tmp});
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
	  	  	callback({"status":"success",step:'BUILD_DASHBOARD_APP',data:stdout})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'BUILD_DASHBOARD_APP',data: stderr})
	  	  }

		});

		run.stdout.on('data', function(data) {
		  	logger.log(data);
		});

	},
	build: (callback) => {
		const store = new Store();
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
	  	  	//callback({"status":"success",step:'BUILD_APP',data:stdout})
	  	  }
	  	  else{
	  	  	logger.log(stderr)
	  	  	callback({"status":"error",step:'BUILD_APP',data:stderr})
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
					let tmp = project;
					tmp['build'] = true;
					store.set('projects.'+project.id,JSON.stringify(tmp))
					store.set('currentProject',tmp);
	  	  	callback({"status":"success",step:'BUILD_APP',data:stdout,project:tmp })
	  	  }
	  	  else{
	  	  	logger.log(stderr)
					let tmp = project;
					tmp['build'] = false;
					store.set('projects.'+project.id,JSON.stringify(tmp))
					store.set('currentProject',tmp);
	  	  	callback({"status":"error",step:'BUILD_DASHBOARD_APP',data:stderr, project:tmp })
	  	  }
		});

		run_dashboard.stdout.on('data', function(data) {
		  	logger.log(data);
		});
	},
	runDocs: () => {

	},
	updateConfigs: (data,callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		project['configs'] = data;

		let destination = project.destination;

		store.set('projects.'+project.id,JSON.stringify(project));
		store.set('currentProject',project);

		//authentication
		let snip = data.authentication == true ? 'server.enableAuth();' : '';
		let code = "'use strict';module.exports = function enableAuthentication(server) { "+snip+" }";
		fs.writeFileSync(destination+'/server/boot/authentication.js',code);

		//API PORT
		fs.readJson(destination+'/server/config.json', (err, packageObj) => {
			let tmp = packageObj;
			tmp['host'] = data.SERVICE_HOST;
			tmp['port'] = data.SERVICE_PORT;
			fs.writeJson(destination+'/server/config.json',tmp)
			.then(() => {

			})
			.catch(err => {
				logger.log(err.toString());
				callback('Problem in updating packages. Try again ! :(');
			})
		});

		//admin files Changes
		let jsConfigsJson = {
			"PORT":data.admin.PORT,
			"HOST":data.admin.HOST,
			"SERVICE_PORT": data.SERVICE_PORT,
			"SERVICE_HOST": data.SERVICE_HOST,
			"CORE_PORT": "8000",
			"CORE_HOST": "127.0.0.1",
			"PROJECT_PATH":destination,
			"FAV_ICON":data.FAV_ICON,
			"PROJECT_BRAND":data.name,
			"DISABLE_ADMIN":data.admin.DISABLE_ADMIN
		};
		let jsConfigData = 'export const configs = '+JSON.stringify(jsConfigsJson);
		fs.copy(data.FAV_ICON, destination+'/dashboard/public/favicon.png',{ overwrite: true }, function (err) {
		    if (err){
		    	console.log(err)
		    }
		});
		fs.copy(data.FAV_ICON, destination+'/public/images/favicon.png',{ overwrite: true }, function (err) {
		    if (err){
		    	console.log(err)
		    }
		});
		fs.writeFileSync(destination+'/dashboard/src/configs.js',jsConfigData);
		fs.writeFileSync(destination+'/dashboard/.env','PORT='+data.admin.PORT);

		setTimeout(()=>{
			callback('success');
		},1000);
	}
}
