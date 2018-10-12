/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../components/Title';
import clean from "../dist/img/clean.svg";
import ModelsList from '../components/Models/List';
import ModelCreator from '../components/Models/Configs';
import ModelProperties from '../components/Models/Properties';

const {ipcRenderer} = window.require('electron')

const ipc = window.ipc || {}

class ModelsManager extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  	  form: {
      },
      info: {
        modelName: '',
        modelType: '',
        modelDB: '',
      },
      createMode: false,
      selectedModel: "User",
      models: [],
      modelsConfigs: [],
      databases: [],
      loading: true,
      selectedDB: null,
      currentModel: null
  	}

    this.switchModel = this.switchModel.bind(this);
    this.fetchModels = this.fetchModels.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.updateModelProps = this.updateModelProps.bind(this);
    this.updateValidations = this.updateValidations.bind(this);
    this.updateRelations = this.updateRelations.bind(this);
    this.changeDb = this.changeDb.bind(this);
    this.updateTypeOptions = this.updateTypeOptions.bind(this);
    this.publishModels = this.publishModels.bind(this);
    this.removeModel = this.removeModel.bind(this);
    this.newModel = this.newModel.bind(this);
    this.updateCurrentModel = this.updateCurrentModel.bind(this);

  	ipc.messaging = {
      getModels: function(data) {
          ipcRenderer.send('models-list', [])
      },
      getModel: function(model) {
      	ipcRenderer.send('model-props',model);
      },
      getModelsConfigs: function(model) {
        ipcRenderer.send('models-configs',model);
      },
      getDatabases: function(model) {
        ipcRenderer.send('databases-list',model);
      },
      publishModels: function(models) {
        ipcRenderer.send('models-publish',models);
      },
      createModels: function(models) {
        ipcRenderer.send('models-create',models);
      },
      removeModel: function(model) {
        ipcRenderer.send('models-remove',model);
      }
    }
  }
  newModel(){
    let _currentModel = [],_model = "newModel";
    let _models = this.state.models;

    _model = _model+Math.random().toString(36).substring(10);

    let tmp = {
        "name": _model,
        "base": "PersistedModel",
        "idInjection": true,
        "forceId": false,
        "options": {
          "validateUpsert": true
        },
        "properties": {},
        "validations": [],
        "relations": {},
        "acls": [],
        "methods": {}
    }

    _models.push(tmp);
    _currentModel = tmp;

    this.setState({ createMode: true ,models: _models, currentModel: _currentModel, selectedModel: _model,selectedDB: "db" })
  }
  updateCurrentModel(model){
    this.setState({currentModel: model});
  }
  removeModel(model){
    if(model!='User'){
      ipc.messaging.removeModel(model);
    } else {
      this.showMessage('Oops Sry :( You cant remove Users model','error');
    }
  }
  publishModels(){
    if(this.state.createMode==true){
      ipc.messaging.createModels({db: this.state.selectedDB ,name:this.state.selectedModel,model:this.state.currentModel});
    } else {
      ipc.messaging.publishModels({db: this.state.selectedDB ,name:this.state.selectedModel,model:this.state.currentModel});
      //will off createMode
    }
  }
  switchModel(model){
    const self = this;
    this.setState({loading: true})
    let _currentModel = null;
    for(let i in this.state.models){
      if(this.state.models[i].name==model){
        _currentModel = this.state.models[i];
      }
    }
    let modelConfigs = this.state.modelsConfigs[model] || {};
    this.setState({"selectedModel": model,"currentModel":_currentModel,"selectedDB": modelConfigs.dataSource || "db" });
    setTimeout( ()=> {
      self.setState({loading: false})
    },1000);
  }
  componentDidMount(){
      this.fetchModels();
  }
  changeDb(db){
    this.setState({selectedDB: db});
  }
  updateModel(key,value,options,props,prop){
    let _currentModel = this.state.currentModel;
    if(options==true)
      _currentModel['options'][key] = value;
    else
      _currentModel[key] = value;

    this.setState({currentModel: _currentModel,selectedModel: _currentModel.name });
  }
  updateModelProps(key,value,prop,name){
    let _currentModel = this.state.currentModel;
    if(key=='label') {
      let tmp = _currentModel['properties'][value];
      delete _currentModel['properties'][value];

      _currentModel['properties'][prop] = tmp;
    } else {
      _currentModel['properties'][prop][key] = name;
    }
    this.setState({currentModel: _currentModel});
  }
  updateTypeOptions(key,value,prop){
    let _currentModel = this.state.currentModel;
    let property = _currentModel.properties[value];
    _currentModel['properties'][value]['options'] = property.options || {};

    if(key=='selectItems'){
      let _selectItems = [];
      for(let i in prop.toString().split(',')){
          _selectItems.push({ value: prop.toString().split(',')[i],label:prop.toString().split(',')[i] })
      }
      _currentModel['properties'][value]['options'][key] = _selectItems;
    } else {
      _currentModel['properties'][value]['options'][key] = prop;
    }
    console.log(_currentModel)

    this.setState({currentModel: _currentModel});
  }
  updateValidations(key,value,prop,name){
    let _currentModel = this.state.currentModel;
    _currentModel['validations'] = _currentModel.validations || [];
    _currentModel['validations'][prop] = _currentModel['validations'][prop] || [];
    _currentModel['validations'][prop][key] = name;
    this.setState({currentModel: _currentModel});
  }
  updateRelations(key,value,prop,name){
    let _currentModel = this.state.currentModel;
    _currentModel['relations'] = _currentModel.relations || [];
    _currentModel['relations'][prop] = _currentModel['relations'][prop] || [];
    _currentModel['relations'][prop][key] = name;
    this.setState({currentModel: _currentModel});
    console.log(_currentModel)
  }
  showMessage(message,type){
    Message({
      message: message || "",
      type: type || "warning"
    });
  }
  fetchModels(){
    const self = this;
    ipc.messaging.getModels();
    ipc.messaging.getModel('User');
    ipc.messaging.getModelsConfigs();
    ipc.messaging.getDatabases();

    ipcRenderer.on('models-list-result',(event, arg) => {
      console.log(arg)
      console.log(self.state.models.length)
      if(self.state.models.length>0){

      } else {
        for(let model in arg){
          if(arg[model].name.indexOf('.json')>=0){
            let name = arg[model].name.split('.json')[0];
            ipc.messaging.getModel(name);
          }
        }
      }

    });

    ipcRenderer.on('models-remove-result',(event,arg) => {
      if(arg.status=='success'){
        let removed_model = arg.data;
        let _models = self.state.models;
        for(let i in _models){
          if(_models[i].name==removed_model)
            delete _models[i];
        }

        self.setState({models: _models,selectedModel: 'User',currentModel: _models[0] })
        self.showMessage("Models Removed Successfully :)","success");
        //self.fetchModels();
      } else {
        self.showMessage(arg.msg,"error")
      }
    });

    ipcRenderer.on('models-create-result',(event, arg) => {
      if(arg=='success'){
        self.showMessage("Model Created Successfully :)","success")
        self.setState({createMode: false})
      } else {
        self.showMessage(arg,"error")
      }
    });

    ipcRenderer.on('models-publish-result',(event, arg) => {
      if(arg=='success'){
        self.showMessage("Models Updated Successfully :)","success")
      } else {
        self.showMessage(arg,"error")
      }
    });

    ipcRenderer.on('model-props-result',(event, arg) => {

      let _models = self.state.models, _currentModel = self.state.currentModel;
      _models.push(arg);

      if(arg.name==self.state.selectedModel){
        _currentModel = arg;
      }
      self.setState({'models': _models,"currentModel": _currentModel});
      setTimeout( ()=> {
          self.setState({loading: false});
      },1000)
    });
    ipcRenderer.on('models-configs-result',(event, arg) => {
      self.setState({'modelsConfigs': arg,'selectedDB':arg[self.state.selectedModel].dataSource});
    });
    ipcRenderer.on('databases-list-result',(event, arg) => {
      let _dbs = [];
      for(var db in arg)
        _dbs.push(arg[db]);

      self.setState({'databases': _dbs});
    });
  }
  onChange(key, value) {
    this.state.info[key] = value;
    this.forceUpdate();
  }
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    let loading = this.state.loading;//this.state.models.length>0 && this.state.currentModel != null && this.state.currentModel.length>0;
    return (
      <div className="app-top">
        <Loading loading={loading} fullscreen={loading} text={"Loading Lab..."} />
    		<ModelsList newModel={this.newModel} switchModel={this.switchModel} selectedModel={this.state.selectedModel} models={this.state.models} />
        <div className="app-preview">
		      <div className="model-single">
		        <ModelCreator publishModels={this.publishModels} createMode={this.state.createMode} removeModel={this.removeModel} publishModels={this.publishModels} changeDb={this.changeDb} updateModel={this.updateModel} currentModel={this.state.currentModel} selectedDB={this.state.selectedDB} databases={this.state.databases} selectedModel={this.state.selectedModel} models={this.state.models} />
	       		{ this.state.currentModel != null ? <ModelProperties updateCurrentModel={this.updateCurrentModel}  currentModel={this.state.currentModel} selectedModel={this.state.selectedModel} models={this.state.models} /> : null }
	   		  </div>
       	</div>
      </div>
    );
  }
}

export default ModelsManager;
