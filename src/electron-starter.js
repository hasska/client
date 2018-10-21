/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const electron = require('electron');
const server = require('../src/core/provider/server');
const fileManager = require('../src/core/filemanager');
const Store = require('electron-store');
const store = new Store();
const menuManager = require('../src/core/utilities/menu');
const projectManager = require('../src/core/utilities/projects');
const logsManager = require('../src/core/utilities/logger');
const modelsManager = require('../src/core/utilities/models');
const dbManager = require('../src/core/utilities/database');


// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const express = require('express');
const path = require('path');
const url = require('url');

const {ipcMain,dialog} = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, wizard, splash;

function createWindow() {
    // Create the browser window.
    const {screen} = require('electron');
    mainWindow = new BrowserWindow({
        width: screen.getPrimaryDisplay().size.width, 
        height: screen.getPrimaryDisplay().size.height, 
        minWidth: 900, 
        minHeight: 480, 
        titleBarStyle: 'hidden', 
        show: false,
        webPreferences:{
          webSecurity:false,
        }
    });

    wizard = new BrowserWindow({width: 820, height: 620, minWidth: 760, minHeight: 480, titleBarStyle: 'hidden', show: false});
    splash = new BrowserWindow({width: 760, height: 480, resizable: false, frame: false, show: false});

    menuManager.setMenu(false);

    // and load the index.html of the app.
    mainWindow.loadURL('file://'+app.getAppPath()+'/build/index.html#/dashboard/overview');
    //mainWindow.loadURL('http://127.0.0.1:3000/#/dashboard/overview')
    wizard.loadURL('file://'+app.getAppPath()+'/build/index.html#/wizard');
    splash.loadURL('file://'+app.getAppPath()+'/build/index.html');

    splash.once('ready-to-show', () => {
      splash.show()
    })

    //mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.session.clearStorageData();

    ipcMain.on('create-project', (event, arg) => {
        event.preventDefault();
        if(!wizard) {
            //wizard = new BrowserWindow({width: 1080, height: 620, minWidth: 760, minHeight: 480, titleBarStyle: 'hidden', show: false});
        } else {
            wizard.show();
        }
    })

    ipcMain.on('create-project-ipc', (event, arg) => {
        event.preventDefault();
        projectManager.createProjectIPC(app, arg, (response) => {
            event.sender.send('models-create-ipc-result', response)
        });
    })

    ipcMain.on('open-dialog', (event,arg) => {
        event.preventDefault();

        dialog.showOpenDialog({properties: [ 'openDirectory']}, (filePaths) => {
             event.sender.send('open-dialog-reply', filePaths)
        });
    });

    ipcMain.on('open-dialog-fav', (event,arg) => {
        event.preventDefault();

        dialog.showOpenDialog({properties: [ 'openFile'],filters: [
              { name: 'Images', extensions: ['jpg', 'png', 'gif'] } ] }, (filePaths) => {
             event.sender.send('open-dialog-fav-reply', filePaths)
        });
    });

    ipcMain.on('project-info', (event,arg) => {
        event.preventDefault();
        event.sender.send('project-info-result', store.get('currentProject'));
    });

    ipcMain.on('models-remove', (event,arg) => {
      event.preventDefault();
      modelsManager.modelRemove(arg, (response) => {
          event.sender.send('models-remove-result', response)
          //mainWindow.reload();
      });
    });

    ipcMain.on('delete-project', (event,arg) => {
      event.preventDefault();
      projectManager.removeProject(arg, (response) => {
          mainWindow.hide();
          splash.reload();
          event.sender.send('delete-project-reply', response)
      });
    });

    ipcMain.on('updateConfigs', (event,arg) => {
      event.preventDefault();
      projectManager.updateConfigs(arg, (response) => {
          event.sender.send('updateConfigs-result', response)
          //mainWindow.reload();
      });
    });

    ipcMain.on('models-publish', (event,arg) => {
        event.preventDefault();
        console.log(arg)
        modelsManager.modelPublish(arg, (response) => {
            event.sender.send('models-publish-result', response)
        });
    });

    ipcMain.on('models-create', (event,arg) => {
        event.preventDefault();
        modelsManager.modelCreate(arg, (response) => {
            event.sender.send('models-create-result', response)
        });
    });

    ipcMain.on('projects-list', (event,arg) => {
        event.preventDefault();
        projectManager.getProjectsIPC( (response) => {
            event.sender.send('projects-list-result', response)
        });
    });

    ipcMain.on('database-remove', (event,arg) => {
        event.preventDefault();
        dbManager.removeDatabase(arg, (response) => {
            event.sender.send('database-remove-result', response)
        });
    });

    ipcMain.on('database-update', (event,arg) => {
        event.preventDefault();
        dbManager.updateDatabase(arg,false, (response) => {
            event.sender.send('database-update-result', response)
        });
    });

    ipcMain.on('database-create', (event,arg) => {
      event.preventDefault();
      dbManager.updateDatabase(arg,true, (response) => {
          event.sender.send('database-update-result', response)
      });
    });

    ipcMain.on('databases-list', (event,arg) => {
        event.preventDefault();
        dbManager.getDatabasesIPC( (response) => {
            event.sender.send('databases-list-result', response)
        });
    });

    ipcMain.on('models-configs', (event,arg) => {
        event.preventDefault();
        modelsManager.getModelsConfigsIPC( (response) => {
            event.sender.send('models-configs-result', response)
        });
    });

    ipcMain.on('main-project', (event,arg) => {
        event.preventDefault();

        wizard.hide();
        //splash.hide();
        store.set('currentProject', arg)
        //menuManager.setMenu(true);
        if(mainWindow){
            mainWindow.show();
            mainWindow.reload();
        }
        
    });

    ipcMain.on('import-project', (event,arg) => {
        event.preventDefault();

        wizard.hide();
        //splash.hide();
        store.set('currentProject', arg)
        menuManager.setMenu(true);
        mainWindow.reload();
    });

    ipcMain.on('models-list', (event,arg) => {
        event.preventDefault();
        modelsManager.getModelsIPC( (response) => {
            if(response != "error")
                event.sender.send('models-list-result', response)
        });
    });

    ipcMain.on('model-props', (event,arg) => {
        event.preventDefault();
        modelsManager.getModelIPC( arg,(response) => {
            if(response != "error")
                event.sender.send('model-props-result', response)
        });
    });

    ipcMain.on('update-logs', (event,arg) => {
        event.preventDefault();
          logsManager.getLogs( (response) => {
              let r = response.data;
              r = r.trim();
              r = r.replace(/(?:\r\n|\r|\n)/g, '<br />');
              event.sender.send('update-logs-result', r)
          });
    });

    ipcMain.on('update-errors', (event,arg) => {
        event.preventDefault();
        logsManager.getErrLogs( (response) => {
            let r = response.data;
              r = r.trim();
              r = r.replace(/(?:\r\n|\r|\n)/g, '<br />');
            event.sender.send('update-errors-result', r)
        });
    });

    ipcMain.on('start-project', (event,arg) => {
        event.preventDefault();
        logsManager.cleanErrLogFile( (response) => { });
        logsManager.cleanLogFile( (response) => { });
        
        projectManager.run( (response) => {
            setTimeout( ()=> {
                event.sender.send('start-project-result', response)
            },2000)
        });
    });

    ipcMain.on('stop-project', (event,arg) => {
        event.preventDefault();
        projectManager.stop( (response) => {
            setTimeout( ()=> {
                event.sender.send('stop-project-result', response)
            },1000);
        });
    });

    ipcMain.on('build-project', (event,arg) => {
        event.preventDefault();
        projectManager.build( (response) => {
            event.sender.send('build-project-result', response)
        });
    });

    ipcMain.on('clean-project', (event,arg) => {
        event.preventDefault();
        projectManager.clean( (response) => {
            setTimeout( ()=> {
                event.sender.send('clean-project-result', response)
            },2000)
        });
    });

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('close', function (event) {
        event.preventDefault();
        mainWindow.hide();

    })

    splash.on('close', function () {
        app.quit();
        //mainWindow.show();
        splash.hide();
        event.preventDefault();
    })

    wizard.on('close', function (event) {
        wizard.hide();
        event.preventDefault();
    })

    app.port = process.env.PORT || 8000;
    app.express = express();
    app.server = server.createServer(app);
    app.logger = server.logger(app);
    //app.filesManager = fileManager.serve(app);
    server.timeout = 1000;

    server.run(app);
}

app.respondToClient = (req) => {
    return req;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
