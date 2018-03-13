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
	log: (content) => {
		const store = new Store();
		let project = store.get('currentProject');
		let log_destination = project.destination+'/haska.log';
		
		fs.ensureFile(log_destination).then(() => {
			  // With Promises:
			fs.readFile(log_destination)
			  .then(results => {
			  	let out = project.destination+'/logs/out.log';
			    fs.writeFileSync(log_destination, results.toString()+'\n'+'[Haska-'+(new Date).toString()+'] '+content.toString())
				  .then(results => {
				    return {
				    	"status": "success","data":results
				    }
				  })
				  .catch((err) => {
				    return {
				    	"status": "error","msg":err.toString()
				    }
				  })
			  })
		})
		.catch(err => {
		  return {"status":"error","msg": err.toString()}
		})
	},
	cleanLogFile: () => {
		const store = new Store();
		let project = store.get('currentProject');
		let log_destination = project.destination+'/haska.log';

		fs.ensureFile(log_destination).then(() => {
		  // With Promises:
			fs.removeSync(log_destination);
		})
		.catch(err => {
		  return {"status":"error","msg": "Log file dosnt exist in destination"}
		})
	},
	getErrLogs: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		let log_destination = project.destination+'/logs/err.log';

		fs.ensureFile(log_destination).then(() => {
		  // With Promises:
			fs.readFile(log_destination,{encoding: 'utf-8'}).then( results => {
			    return callback({"status":"success","data": results.toString()})
			})
			.catch(err => {
			  return callback({"status":"error","msg": "Log file dosnt exist in destination"})
			})
		});
	},
	getOutLogs: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		let log_destination = project.destination+'/out.log';

		fs.ensureFile(log_destination).then(() => {
			  // With Promises:
			fs.readFile(log_destination,{encoding: 'utf-8'}).then(results => {
			    return callback({"status":"success","data": results.toString()})
			  })
			.catch(err => {
			  return callback({"status":"error","msg": "Log file dosnt exist in destination"})
			})
		});
	},
	getLogs: (callback) => {
		const store = new Store();
		let project = store.get('currentProject');
		let log_destination = project.destination+'/haska.log';

		fs.ensureFile(log_destination).then(() => {
			  // With Promises:
			fs.readFile(log_destination,{encoding: 'utf-8'}).then(results => {
			    callback({"status":"success","data": results.toString()})
			})
			.catch(err => {
			  return callback({"status":"error","msg": "Log file dosnt exist in destination"})
			})
		});
		
	}
}