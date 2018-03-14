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
	createDatabase: (req,res,app) => {
		let database = req.body.database;
		let project = req.body.project;
		let new_data = {
		    "name": database.datasource,
		    "connector": database.connector,
		    "host": database.host,
		    "user": database.username,
		    "password": database.password,
		    "database": database.name
		};

		const store = new Store();
		const datasource_dir = req.body.project.destination+'/server/datasources.json';

		fs.readJson(datasource_dir, (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	console.error(err)
		    	res.send(app.respondToClient({
					msg: err,
					status: 'error'
				}));
		    }
		    else{

				fs.writeFileSync(datasource_dir, new_data);

				store.set('databases.'+database.datasource,JSON.stringify(new_data))

				res.send(app.respondToClient({
					msg: 'datasource created',
					data: datasource_dir,
					status: 'success'
				}));

		    }

		})
	},
	removeDatabase: (req,res,app) => {
		const store = new Store();
		const datasource_dir = req.body.project.destination+'/server/datasources.json';
		store.delete('databases.'+req.body.database.datasource);

		fs.readJson(datasource_dir, (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	console.error(err)
		    	res.send(app.respondToClient({
					msg: err,
					status: 'error'
				}));
		    }
		    else{

				delete tmpData[req.body.databases.datasource];

				fs.writeFileSync(datasource_dir, tmpData);

				store.delete('databases.'+database.datasource);

				res.send(app.respondToClient({
					msg: 'datasource deleted',
					status: 'success'
				}));

		    }

		})
		res.send(app.respondToClient({
			msg: 'success fetch',
			data: store.get('databases.'+req.query.name),
			status: 'success'
		}));
	},
	setConfiguration: (req,res,app) => {
		let database = req.body.database;
		let project = req.body.project;
		let new_data = {
		    "name": database.datasource,
		    "connector": database.connector,
		    "host": database.host,
		    "user": database.username,
		    "password": database.password,
		    "database": database.name
		};

		const store = new Store();
		const datasource_dir = req.body.project.destination+'/server/datasources.json';

		fs.readJson(datasource_dir, (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	console.error(err)
		    	res.send(app.respondToClient({
					msg: err,
					status: 'error'
				}));
		    }
		    else{

				tmpData[database.datasource] = new_data;
				fs.writeFileSync(datasource_dir, tmpData);

				store.set('databases.'+database.datasource,JSON.stringify(new_data))

				res.send(app.respondToClient({
					msg: 'datasource updated',
					data: datasource_dir,
					status: 'success'
				}));

		    }
		})
	},
	getDatabases: (req,res,app) => {

		const datasource_dir = req.body.project.destination+'/server/datasources.json';

		fs.readJson(datasource_dir, (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	console.error(err)
		    	res.send(app.respondToClient({
					msg: err,
					status: 'error'
				}));
		    }
		    else{

				res.send(app.respondToClient({
					msg: 'success fetch',
					data: tmpData,
					status: 'success'
				}));

		    }
		})
	},
	getDatabaseById: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			msg: 'success fetch',
			data: store.get('databases.'+req.query.name),
			status: 'success'
		}));
	},
	getDatabasesIPC: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');

		fs.readJson(project.destination+'/server/datasources.json', (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	callback('error');
		    }  else {
		    	callback(packageObj)
		    }
		});
	},
	createDatabase: (arg,callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		let _dir = project.destination+'/server/datasources.json';

		fs.readJson(_dir, (err, packageObj) => {

		    let tmpData = packageObj;
				tmpData[arg.name] = arg;

		    if (err) {
		    	callback('error');
		    }  else {
					fs.writeJson(_dir, tmpData, (err) => {
						if(err) callback(err.toString());
						else {
							callback("success");
						}
					});
		    }
		});
	},
	removeDatabase: (arg,callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		let _dir = project.destination+'/server/datasources.json';

		if(arg.name=='db'){
			self.showMessage("You can remove memory default database !","error")
			return;
		}

		fs.readJson(_dir, (err, packageObj) => {
			let tmp = packageObj;
			delete tmp[arg];
			fs.writeJson(_dir, tmp, (err) => {
				if(err) callback({"status":'error',"msg": err.toString()});
				else {
					callback({"status":"success",data: tmp});
				}
			});
		});
	},
	updateDatabase: (arg,create,callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		let _dir = project.destination+'/server/datasources.json';

		fs.readJson(_dir, (err, packageObj) => {
				console.log(create)
		    let tmpData = packageObj;
				if(typeof tmpData[arg.name] != "undefined" && create==true){
					callback({"status":'error',"msg":"Select unique name for your database"});
					return;
				} else {
					tmpData[arg.name] = arg;
				}

		    if (err) {
		    	callback({"status":'error',"msg":err.toString()});
		    }  else {
					fs.writeJson(_dir, tmpData, (err) => {
						if(err) callback({"status":'error',"msg": err.toString()});
						else {
							callback({"status":"success",data: arg.name});
						}
					});
		    }
		});

	}
}
