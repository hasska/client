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
	getModel: (req,res,app) => {
		const store = new Store();
		res.send(app.respondToClient({
			data: store.get('models.'+req.query.id+'-'+req.query.project_id),
			status: 'success'
		}));
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
	getAllMethods: (req,res,app) => {

	},
}