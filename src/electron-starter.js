const electron = require('electron');

const server = require('../src/core/provider/server');
const fileManager = require('../src/core/filemanager');
const Store = require('electron-store');
const store = new Store();
const menuManger = require('../src/core/utilities/menu');
const projectManger = require('../src/core/utilities/projects');
const logsManger = require('../src/core/utilities/logger');
const modelsManager = require('../src/core/utilities/models');
const dbManger = require('../src/core/utilities/database');


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
    mainWindow = new BrowserWindow({width: screen.getPrimaryDisplay().size.width, height: screen.getPrimaryDisplay().size.height, minWidth: 900, minHeight: 480, titleBarStyle: 'hidden', show: false,"webPreferences":{
      "webSecurity":false
    }});
    wizard = new BrowserWindow({width: 820, height: 620, minWidth: 760, minHeight: 480, titleBarStyle: 'hidden', show: false});
    splash = new BrowserWindow({width: 760, height: 480, resizable: false, frame: false, show: false});

    menuManger.setMenu(false);

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000/#/dashboard/overview');
    wizard.loadURL('http://localhost:3000/#/wizard');
    splash.loadURL('http://localhost:3000');

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

  ipcMain.on('updateConfigs', (event,arg) => {
      event.preventDefault();
      projectManger.updateConfigs(arg, (response) => {
          event.sender.send('updateConfigs-result', response)
          //mainWindow.reload();
      });
  });

    ipcMain.on('models-publish', (event,arg) => {
        event.preventDefault();
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
        projectManger.getProjectsIPC( (response) => {
            event.sender.send('projects-list-result', response)
        });
    });

    ipcMain.on('database-remove', (event,arg) => {
        event.preventDefault();
        dbManger.removeDatabase(arg, (response) => {
            event.sender.send('database-remove-result', response)
        });
    });

    ipcMain.on('database-update', (event,arg) => {
        event.preventDefault();
        dbManger.updateDatabase(arg,false, (response) => {
            event.sender.send('database-update-result', response)
        });
    });

    ipcMain.on('database-create', (event,arg) => {
      event.preventDefault();
      dbManger.updateDatabase(arg,true, (response) => {
          event.sender.send('database-update-result', response)
      });
    });

    ipcMain.on('databases-list', (event,arg) => {
        event.preventDefault();
        dbManger.getDatabasesIPC( (response) => {
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
        splash.hide();
        store.set('currentProject', arg)
        menuManger.setMenu(true);
        mainWindow.show();
    });

    ipcMain.on('import-project', (event,arg) => {
        event.preventDefault();

        wizard.hide();
        splash.hide();
        console.log(arg)
        store.set('currentProject', arg)
        menuManger.setMenu(true);
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
          logsManger.getLogs( (response) => {
              event.sender.send('update-logs-result', response.data)
          });
    });

    ipcMain.on('update-errors', (event,arg) => {
        event.preventDefault();
        logsManger.getErrLogs( (response) => {
            event.sender.send('update-errors-result', response.data)
        });
    });

    ipcMain.on('start-project', (event,arg) => {
        event.preventDefault();
        projectManger.run( (response) => {
            setTimeout( ()=> {
                event.sender.send('start-project-result', response)
            },2000)
        });
    });

    ipcMain.on('stop-project', (event,arg) => {
        event.preventDefault();
        projectManger.stop( (response) => {
            setTimeout( ()=> {
                event.sender.send('stop-project-result', response)
            },1000);
        });
    });

    ipcMain.on('build-project', (event,arg) => {
        event.preventDefault();
        projectManger.build( (response) => {
            event.sender.send('build-project-result', response)
        });
    });

    ipcMain.on('clean-project', (event,arg) => {
        event.preventDefault();
        projectManger.clean( (response) => {
            setTimeout( ()=> {
                event.sender.send('clean-project-result', response)
            },2000)
        });
    });

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('close', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    splash.on('close', function () {
        //app.quit()
        //mainWindow.show();
        spash.hide();
        event.preventDefault();
    })

    wizard.on('close', function (event) {
        wizard.hide();
        event.preventDefault();
        //wizard = null;
        //wizard = new BrowserWindow({width: 1080, height: 620, minWidth: 760, minHeight: 480, titleBarStyle: 'hidden', show: false});
       // wizard = null;
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
