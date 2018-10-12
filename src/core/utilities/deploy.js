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

module.exports = {
	getSourceCode: (req,res,app) => {
		let destination = req.body.destination;
		let source = req.body.project.destination;
		let version = req.body.version;
		let project = req.body.project;
		fs.copy(source, destination, function (err) {
		    if (err){
		        console.log('An error occured while copying the folder.')
		        res.send(app.respondToClient({
					msg: 'Problem in creating function. Try again ! :(',
					status: 'error'
				}));
				return;
		    } else {
		    	res.send(app.respondToClient({
					msg: 'Deployed successfully :)',
					status: 'success'
				}));
		    }
		}
	}
}