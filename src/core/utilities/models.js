/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs-extra");
const Store = require('electron-store');
const shell = require('shelljs');
const dirToJson = require('dir-to-json');

module.exports = {
	createModel: (req,res,app) => {

		const store = new Store();
		let models = store.get('models'),model_config = {};

		//Create Files

		const _JS_DIRECTORY = req.body.project.destination+'/common/models/'+req.body.title+'.js';
		const _JSON_DIRECTORY = req.body.project.destination+'/common/models/'+req.body.title+'.json';
		const _MODELS_JSON_DIRECTORY = req.body.project.destination+'/server/model-config.json';

		fs.ensureFile(_JS_DIRECTORY, err => { console.log(err) });
		fs.ensureFile(_JSON_DIRECTORY, err => { console.log(err) });

		let jsData = "'use strict'; module.exports = function("+req.body.title+") {};";
		let jsonData = {
		  "name": req.body.title,
		  "base": req.body.type,
		  "idInjection": true,
		  "forceId": false,
		  "options": {
		    "validateUpsert": true,
			"noedit": false,
			"nocreate": false,
		  },
		  "properties": {

		  },
		  "validations": [],
		  "relations": {},
		  "acls": [],
		  "methods": {}
		};

		store.set('models.'+req.body.title+'-'+req.body.project_id,JSON.stringify(jsonData));

		model_config[req.body.title] = {
		    "dataSource": req.body.database.datasource,
		    "public": true
		};

		fs.writeFileSync(_JS_DIRECTORY, jsData);
		fs.writeJson(_JSON_DIRECTORY, jsonData);
		fs.writeJson(_MODELS_JSON_DIRECTORY, model_config);

		res.send(app.respondToClient({
			msg: 'Model created successfully :)',
			status: 'success'
		}));

	},
	setProperties: (req,res,app) => {
		let model = req.body.model;
		const _JSON_DIRECTORY = req.body.project.destination+'/common/models/'+model.title+'.json';

		fs.readJson(_JSON_DIRECTORY, (err, packageObj) => {
		  if (err) console.error(err)

		  let tmpData = packageObj;
		  tmpData.properties = req.body.properties;
		  fs.writeJson(_JSON_DIRECTORY, tmpData);

		  res.send(app.respondToClient({
				msg: 'properties added successfully !',
				status: 'success'
			}));
		})
	},
	setOptions: (req,res,app) => {
		let model = req.body.model;
		const _JSON_DIRECTORY = req.body.project.destination+'/common/models/'+model.title+'.json';

		fs.readJson(_JSON_DIRECTORY, (err, packageObj) => {
		  if (err) console.error(err)

		  let tmpData = packageObj;
		  tmpData.options = req.body.options;
		  fs.writeJson(_JSON_DIRECTORY, tmpData);

		  res.send(app.respondToClient({
				msg: 'properties added successfully !',
				status: 'success'
			}));
		})
	},
	getModelsConfigs: (req,res,app) => {

		fs.readJson(req.query.project_dir+'/server/model-config.json', (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	console.error(err)
		    	res.send(app.respondToClient({
					msg: err,
					status: 'error'
				}));
		    }  else {
		    	res.send(app.respondToClient({
					data: packageObj,
					status: 'success'
				}));
		    }
		});
	},
	getModelsConfigsIPC: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');

		fs.readJson(project.destination+'/server/model-config.json', (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	callback('error');
		    }  else {
		    	callback(packageObj)
		    }
		});
	},
	getProjectConfigsIPC: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');

		fs.readJson(project.destination+'/server/config.json', (err, packageObj) => {

		    let tmpData = packageObj;

		    if (err) {
		    	callback('error');
		    }  else {
		    	callback(packageObj)
		    }
		});
	},
	setBaseConfigs: (req,res,app) => {
		let model = req.body.model;
		const _JSON_DIRECTORY = req.body.project.destination+'/common/models/'+model.title+'.json';

		fs.readJson(_JSON_DIRECTORY, (err, packageObj) => {
		  if (err) console.error(err)

		  let tmpData = packageObj;
		  for(var item in req.body.configs){
		  	tmpData[item] = req.body.configs[item];
		  }

	      fs.writeJson(_JSON_DIRECTORY, tmpData);

		  res.send(app.respondToClient({
				msg: 'properties added successfully !',
				status: 'success'
			}));
		})
	},

	getModels: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('models'),
			status: 'success'
		}));
	},
	getModelsIPC: (callback) =>{
		const store = new Store();
		let project = store.get('currentProject');

		dirToJson( project.destination+'/common/models' , function( err, dirTree ){
			if( err ){
				callback('error');
			}else{
				callback(dirTree.children)
			}
		});
	},
	modelCreate(arg,callback){
		const store = new Store();
		let project = store.get('currentProject');
		let _dir = project.destination+'/common/models/'+arg.name+'.json';
		let _dir_js = project.destination+'/common/models/'+arg.name+'.js';
		const self = this;

		fs.ensureFile(_dir, err => {
			if(!err){
				fs.writeJson(_dir, arg.model, (err) => {
					if(err) callback(err.toString());
					else {
						self.updateDb(arg.name,arg.db);
					}
				});
			}
		});

		let _data_js = "'use strict'; module.exports = function("+arg.name+") { }";
		fs.ensureFile(_dir_js, err => {
				if(err) callback(err.toString());
				else{
					fs.writeJson(_dir_js, _data_js, (err) => {
						if(err) callback(err.toString());
						else {
							callback('success')
						}
					});
				}
			});

	},
	updateDb(model,db){
		const store = new Store();
		let project = store.get('currentProject');

		fs.readJson(project.destination+'/server/model-config.json', (err,data) => {
		  if(err){
				console.log("You dont have model configs file");
				return;
			}
		  let _data = data;
			_data[model] = { "dataSource": db, "public":true };
			fs.writeJson(project.destination+'/server/model-config.json', _data, (err) => {
				if(err) console.log(err.toString());
				else{
					fs.copy(project.destination+'/server/model-config.json', project.destination+'/dashboard/src/models/model-config.json', function (err) {
						if (!err){
							console.log('datasources for '+model+' changed successfully')
						} else {
							console.log('problem in copy');
						}
					});
				}
			});

		})
	},
	modelPublish(arg,callback){
		const store = new Store();
		let project = store.get('currentProject');
		const self = this;

		if(arg.name == 'User')
			fs.writeJson(project.destination+'/common/User.json', arg.model, (err) => {
				if(err) callback(err.toString());
				else {
					self.updateDb(arg.name,arg.db);
					fs.copy(project.destination+'/common/User.json', project.destination+'/dashboard/src/models/common/User.json', function (err) {
						if (!err){
							callback('success')
						}
					});
				}
			});
		else {
			fs.writeJson(project.destination+'/common/models/'+arg.name+'.json', arg.model, (err) => {
				if(err) callback(err.toString());
				else {
					self.updateDb(arg.name,arg.db);
					fs.copy(project.destination+'/common/models/'+arg.name+'.json', project.destination+'/dashboard/src/models/common/models/'+arg.name+'.json', function (err) {
						if (!err){
							callback('success')
						}
					});
				}
			});
		}




	},
	getModelIPC: (model,callback) =>{
		const store = new Store();
		let project = store.get('currentProject');

		let _JSON_DIRECTORY = project.destination+'/common/models/'+model+'.json';
		if(model=='User')
			 _JSON_DIRECTORY = project.destination+'/common/'+model+'.json';

		fs.readJson(_JSON_DIRECTORY, (err, packageObj) => {
		  if (err) console.error(err)

		  callback(packageObj);
		});
	},
	getModel: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('models.'+req.query.id+'-'+req.query.project_id),
			status: 'success'
		}));
	},
	modelRemove: (model,callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		if(model=='User'){
			callback({"status":"error","msg":"You can not remove user built-in model"});
			return;
		}

		fs.removeSync(project.destination+'/common/models/'+model+'.json')
		fs.removeSync(project.destination+'/common/models/'+model+'.js');
		/*fs.remove('/tmp/myfile')
		.then(() => {
		  console.log('success!')
		})
		.catch(err => {
		  console.error(err)
		})*/

		fs.readJson(project.destination+'/server/model-config.json', (err,data) => {
		  if(err){
				callback({"status":"error","msg":"You dont have model configs file"});
				return;
			}
		  let _data = data;
			delete _data[model];
			fs.writeJson(project.destination+'/server/model-config.json', _data, (err) => {
				if(err) callback({"status":"error","msg":err.toString()});
				else callback({"status":"success","data":model})
			});
		})


	},
	removeModel: (req,res,app) => {
		const store = new Store();
		let model = store.get('models.'+req.body.model.id);

		fs.remove(req.body.project.destination+'/common/models/'+req.body.project.title+'.json', err => { console.log(err) })
		fs.remove(req.body.project.destination+'/common/models/'+req.body.project.title+'.js', err => { console.log(err) })

		store.delete('models.'+req.body.model.id);
	  		res.send(app.respondToClient({
				msg: 'Model deleted successfully',
				status: 'success'
			}));
	},
	setRelations: (req,res,app) => {

	},
	addMethod: (req,res,app) => {

	},
	deleteMethod: (req,res,app) => {

	},
	updateMethod: (req,res,app) => {

	},
	getAllMethods: (req,res,app) => {

	}
}
