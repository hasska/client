/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs-extra");
const Store = require('electron-store');
const shell = require('shelljs');

module.exports = {
	createProject: (req,res,app) => {
		const store = new Store();
		const source = app.getAppPath()+'/src/core/assets/basecode';
		const destination = req.body.destination;
	
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
					title: req.body.title,
					destination: destination,
					last_modified: new Date(),
					database: {
						name: req.body.database.name,
						type: req.body.database.type,
						username: req.body.database.username,
						password: req.body.database.password,
						host: req.body.database.host,
						port: req.body.database.port
					}
				};

				store.set('projects.'+_id,JSON.stringify(new_data))

			    res.send(app.respondToClient({
					msg: 'Your project created successfully :)',
					status: 'success'
				}));

			});
		  } else {
		  	res.send(app.respondToClient({
				msg: 'This folder exist ! :(',
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
	runProject: (req,res,app) => {
		shell.cd(req.body.destination);
		if (shell.exec('node .').code !== 0) {
		  shell.echo('Error: Git commit failed');
		  shell.exit(1);
		  res.send(app.respondToClient({
				msg: 'Problem in run project',
				status: 'error'
		  }));
		} else {
			res.send(app.respondToClient({
				msg: 'Project Running successfully',
				status: 'success'
			}));
		}
		
	},
	stopProject: (req,res,app) => {
		shell.cd(req.body.destination);
	    shell.exit(1);
	},
	buildProject: (req,res,app) => {
		shell.cd(req.body.destination);
	    if (shell.exec('npm install').code !== 0) {
		  shell.echo('Error: Installing');
		  shell.exit(1);
		  res.send(app.respondToClient({
				msg: 'Problem in build project',
				status: 'error'
		  }));
		} else {
			res.send(app.respondToClient({
				msg: 'Project Builed successfully',
				status: 'success'
			}));
		}
	}
}