/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const shell = require('shelljs');
const fs = require("fs");
const fse = require("fs-extra");
const readdirp = require('readdirp');
const dirToJson = require('dir-to-json');

module.exports = {
    readDir: (req,res,app) => {
	    dirToJson( req.body.path , function( err, dirTree ){
			if( err ){
				res.send(app.respondToClient({
					data: 'Problem in fetching files ...',
					status: 'error'
				}));
			}else{
				res.send(app.respondToClient({
					data: dirTree,
					status: 'success'
				}));
			}
		});
	},
	makeDir: (req,res,app) => {
		fse.ensureDir(req.body.path, err => {
		  // dir has now been created, including the directory it is to be placed in
		  if(!err){
		  	res.send(app.respondToClient({
				data: req.body.path,
				status: 'success'
			}));
		  } else {
		  	res.send(app.respondToClient({
				data: 'Problem in creating directory ...',
				status: 'error'
			}));
		  }

		});
	},
	expDir: (req,res,app) => {

	},
	addDependency: (req,res,app) => {

	},
    readFile: (req,res,app) => {
    	fs.open(req.body.path, 'r', function (err, fh) {
    		if(!err){
		     	fs.readFile(fh, 'utf8', function () {
			        res.send(app.respondToClient({
						data: arguments[1],
						status: 'success'
					}));
			    });
			} else {
				res.send(app.respondToClient({
					data: err.toString(),
					status: 'error'
				}));
			}
				   
		});
	},
	makeFile: (req,res,app) => {
		fse.ensureFile(req.body.path, err => {
		  if(!err){
		  	res.send(app.respondToClient({
				data: req.body.path,
				status: 'success'
			}));
		  } else {
		  	res.send(app.respondToClient({
				data: 'Problem in creating directory ...',
				status: 'error'
			}));
		  }
		})
	},
	writeFile: (req,res,app) => {
		fse.writeFile(req.body.path, req.body.content, (err) => {  
		    if(!err){
			  	res.send(app.respondToClient({
					data: req.body.content,
					status: 'success'
				}));
			  } else {
			  	res.send(app.respondToClient({
					data: 'Problem in writing file ...',
					status: 'error'
				}));
			  }
		});
	},
	mvFile: (req,res,app) => {
		fse.move(req.body.src_path, req.body.new_path, err => {
		  if (err) {
		  	res.send(app.respondToClient({
				data: req.body.new_path,
				status: 'success'
			}));
		  } else {
		  	res.send(app.respondToClient({
				data: 'Problem in moving file ...',
				status: 'error'
			}));
		  }
		})
	},
	rmFile: (req,res,app) => {
		fse.remove(req.body.path, err => {
		  if(!err){
		  	res.send(app.respondToClient({
				data: req.body.path,
				status: 'success'
			}));
		  } else {
		  	res.send(app.respondToClient({
				data: 'Problem in removing file ...',
				status: 'error'
			}));
		  }
		})
	}
}

