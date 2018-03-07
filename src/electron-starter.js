const electron = require('electron');
const server = require('../src/core/provider/server');
const fileManager = require('../src/core/filemanager');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const express = require('express');        
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, wizard, splash;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1280, height: 680, minWidth: 760, minHeight: 480, titleBarStyle: 'hidden', show: false});
    wizard = new BrowserWindow({width: 1080, height: 620, minWidth: 760, minHeight: 480, titleBarStyle: 'hidden', show: false});
    splash = new BrowserWindow({width: 760, height: 480, resizable: false, frame: false, show: false});

    // and load the index.html of the app.
<<<<<<< Updated upstream
    mainWindow.loadURL('http://localhost:3000/dashboard');
    wizard.loadURL('http://localhost:3000/wizard');
    splash.loadURL('http://localhost:3000');

    splash.once('ready-to-show', () => {
      splash.show()
    })
=======
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.session.clearStorageData();
>>>>>>> Stashed changes
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
<<<<<<< Updated upstream
    splash.on('closed', function () {
        mainWindow.show();
        wizard.show();
    })
    wizard.on('closed', function () {
    })
=======
    
    app.port = process.env.PORT || 8000;
    app.express = express();
    app.server = server.createServer(app);
    app.logger = server.logger(app);
    app.filesManager = fileManager.serve(app);
    server.timeout = 2000;  

    server.run(app);
}

app.respondToClient = (req) => {
    return req;
>>>>>>> Stashed changes
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