import React, { Component } from 'react';
import DatabaseList from './DatabaseList';
import DatabaseSingle from './DatabaseSingle';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';


const {ipcRenderer} = window.require('electron')

const ipc = window.ipc || {}

class DatabaseManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      databases: [],
      createMode: false,
      currentDatabase: [],
      selectedDb: "db"
    }

    this.updateDatabase = this.updateDatabase.bind(this);
    this.switchDb = this.switchDb.bind(this)
    this.newDb = this.newDb.bind(this)
    this.publishDb = this.publishDb.bind(this)
    this.removeDb = this.removeDb.bind(this)

    ipc.messaging = {
      getDatabases: function() {
          ipcRenderer.send('databases-list')
      },
      updateDb: function(db){
        ipcRenderer.send('database-update',db);
      },
      createDb: function(db){
        ipcRenderer.send('database-create',db);
      },
      removeDb: function(db){
        ipcRenderer.send('database-remove',db);
      }
    }
  }
  publishDb(db){
    console.log(this.state.createMode)
    if(this.state.createMode==true)
      ipc.messaging.createDb(db)
    else {
      ipc.messaging.updateDb(db)
    }
  }

  removeDb(db){
    ipc.messaging.removeDb(db)
  }
  updateDatabase(key,value){
    let _current = this.state.currentDatabase;
    _current[key] = value;
    this.setState({ currentDatabase: _current })
  }
  newDb(){
    let dbs = this.state.databases;
    let newDb = {
      "name": "Database"+parseInt(this.state.databases.length+1),
      "connector": "memory",
      "host": "",
      "port": "",
      "database": "",
      "username": "",
      "password": ""
    };

    dbs.push(newDb);
    this.setState({createMode: true,databases: dbs, selectedDb: newDb.name, currentDatabase: newDb});
  }
  switchDb(db){
    if(this.state.createMode==true){
      let _dbs = this.state.databases;
      delete _dbs[_dbs.length-1];
      this.setState({createMode:false,selectedDb: db,currentDatabase: this.getDbData(db),databases: _dbs })
    } else {
      this.setState({createMode:false,selectedDb: db,currentDatabase: this.getDbData(db) })
    }
  }
  getDbData(db){
    let databases = this.state.databases;
    for(let i in databases){
      if(databases[i].name == db){
        return databases[i];
      }
    }
  }
  showMessage(message,type){
    Message({
      message: message || "",
      type: type || "warning"
    });
  }
  componentWillMount(){
    ipc.messaging.getDatabases();
    const self = this;
    ipcRenderer.on('databases-list-result',(event, arg) => {
      let _dbs = [];
      for(var db in arg)
        _dbs.push(arg[db]);

      self.setState({ 'databases': _dbs });
      self.switchDb("db");
    });

    ipcRenderer.on('database-update-result',(event, arg) => {
      if(arg.status=='success'){
        self.showMessage("Database Updated Successfully :)","success")
        self.setState({'createMode': false,selectedDb: arg.data })
      } else {
        self.showMessage(arg.msg,"error")
      }
    });

    ipcRenderer.on('database-remove-result',(event, arg) => {

      if(arg.status=='success'){
        let _dbs = [];
        for(var db in arg.data)
          _dbs.push(arg.data[db]);

        self.showMessage("Database Removed Successfully :)","success")
        self.setState({'createMode': false,selectedDb: 'db',currentDatabase: self.state.databases[0],databases: _dbs })
        self.switchDb("db");
      } else {
        self.showMessage(arg.msg,"error")
      }
    });
  }
  render() {
    let dbs = this.state.databases;
    return (
      <div className="app-window">
      {
      	this.state.databases.length > 0 && <div>
        <DatabaseList newDb={this.newDb} switchDb={this.switchDb} selectedDb={this.state.selectedDb} databases={this.state.databases} />
        <DatabaseSingle publishDb={this.publishDb} removeDb={this.removeDb} updateDatabase={this.updateDatabase} selectedDb={this.state.selectedDb} currentDatabase={this.state.currentDatabase} createMode={this.state.createMode} />
        </div>
      }
      </div>
    );
  }
}

export default DatabaseManager;
