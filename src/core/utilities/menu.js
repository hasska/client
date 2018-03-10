/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs-extra");
const Store = require('electron-store');
const shell = require('shelljs');
const {Menu,ipcRenderer} = require('electron');
const projects = require('../utilities/projects');
const logger = require('../utilities/logger');

const ipc = {}

module.exports = {
	setMenu: (appReady) => {

		ipc.messaging = {
		  sendStartProject: function(data) {
		      ipcRenderer.send('start-project', data)
		  },
		  sendStopProject: function(data) {
		      ipcRenderer.send('stop-project', data)
		  },
		  sendBuildProject: function(data) {
		      ipcRenderer.send('build-project', data)
		  },
		  sendCleanProject: function(data) {
		      ipcRenderer.send('clean-project', data)
		  }
		}

		const store = new Store();
		const template = [
	    {
	      label: 'Edit',
	      submenu: [
	        {role: 'undo'},
	        {role: 'redo'},
	        {type: 'separator'},
	        {role: 'cut'},
	        {role: 'copy'},
	        {role: 'paste'},
	        {role: 'pasteandmatchstyle'},
	        {role: 'delete'},
	        {role: 'selectall'}
	      ]
	    },
	    {
	      label: 'View',
	      submenu: [
	        {role: 'reload'},
	        {role: 'forcereload'},
	        {role: 'toggledevtools'},
	        {type: 'separator'},
	        {role: 'resetzoom'},
	        {role: 'zoomin'},
	        {role: 'zoomout'},
	        {type: 'separator'},
	        {role: 'togglefullscreen'}
	      ]
	    },
	    {
	      role: 'window',
	      submenu: [
	        {role: 'minimize'},
	        {role: 'close'}
	      ]
	    },
	    {
	      role: 'help',
	      submenu: [
	        {
	          label: 'Learn More',
	          click () { require('electron').shell.openExternal('https://electronjs.org') }
	        }
	      ]
	    }
	  ];

	  if(appReady){
	  	template.push({
	    	label: 'Services',
	    	enabled: false,
	    	submenu: [
	    		{ label: 'Models Manager',click(){ } },
	    		{ label: 'Database Manager',click(){ } },
	    		{ label: 'API Explorer',click(){ } },
	    		{ label: 'Admin Dashboard',click(){ } },
	    		{ label: 'Statistics & Monitoring',click(){ } },
	    		{ label: 'Documentation',click(){ } },
	    		{ label: 'Deployment',click(){ } },
	    		{ label: 'Preferences',click(){ } }
	    	]
	    },
	    {
	    	label: 'Product',
	    	submenu: [
	    		{ label: 'Run',click(){ projects.run((data)=>{ ipc.messaging.sendStartProject(data) }) } },
	    		{ label: 'Stop All',click(){ projects.stop((data)=>{ ipc.messaging.sendStopProject(data) }) } },
	    		{ label: 'Build',click(){ projects.build((data)=>{ ipc.messaging.sendBuildProject(data) }) } },
	    		{ label: 'Clean',click(){  projects.clean((data)=>{ ipc.messaging.sendCleanProject(data) }) } },
	    		{ label: 'Analyze',click(){ } },
	    		{ label: 'Deploy',click(){ } }
	    	]
	    });
	  }


	   const menu = Menu.buildFromTemplate(template)
  	   Menu.setApplicationMenu(menu)


	}
}