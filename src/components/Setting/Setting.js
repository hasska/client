import React, { Component } from 'react';

import General from './General';
import Environments from './Environments';
import AdminDashboard from './AdminDashboard';
import Account from './Account';
import Dependencies from './Dependencies';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';


const {ipcRenderer} = window.require('electron')

const ipc = window.ipc || {}

class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      configs: this.props.project.configs,
      loading: false
    }

    ipc.messaging = {
	    updateConfigs: function(data) {
	        ipcRenderer.send('updateConfigs', data)
	    }
	  }

    this.updateConfigs = this.updateConfigs.bind(this);

  }
  componentWillMount(){
		const self = this;
		ipcRenderer.on('updateConfigs-result', (event,arg) => {
      console.log(arg)
			if(arg=="success"){
        self.showMessage("Configuration Updated Successfully :)","success");
      } else {
        self.showMessage(arg.toString(),"error");
      }
		});
	}
  showMessage(message,type){
    Message({
      message: message || "",
      type: type || "warning"
    });
  }
  isAdminConfig(key){
    if(key == 'PORT' || key == 'HOST' || key == 'PROJECT_BRAND' || key == 'DISABLE_ADMIN' || key == 'default_password' || key == 'default_username')
      return true;
  }
  ApplyChanges(){
    // publish new settings
    console.log('inja')
    ipc.messaging.updateConfigs(this.state.configs)
  }
  updateConfigs(key,value){

    if(!this.isAdminConfig(key)){
      let _configs = this.state.configs;
      _configs[key] = value;
      this.setState({ configs: _configs })
    } else {
      let _configs = this.state.configs;
      _configs['admin'][key] = value;
      this.setState({ configs: _configs })
    }
  }
  render() {
    return (
      <div className="app-top">
      <Loading loading={this.state.loading} fullscreen={this.state.loading} text={"Loading Lab..."} />

	      <div className="setting-wrapper">
          <div className="settings-actions">
            <Button onClick={ ()=>this.ApplyChanges() } type="primary" size="small" className="publish-model"><Icon name="plus" />Apply Changes</Button>
          </div>
			    <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
			      <Tabs.Pane label="General" name="1">
				      <General updateConfigs={this.updateConfigs} configs={this.state.configs} />
			      </Tabs.Pane>
			      <Tabs.Pane label="Environments" name="2">
				      <Environments updateConfigs={this.updateConfigs} configs={this.state.configs} />
			      </Tabs.Pane>
			      <Tabs.Pane label="Admin Dashboard" name="3">
				      <AdminDashboard updateConfigs={this.updateConfigs} configs={this.state.configs}  />
			      </Tabs.Pane>
			      <Tabs.Pane label="Account & Licence" name="4">
				      <Account updateConfigs={this.updateConfigs} configs={this.state.configs}  />
			      </Tabs.Pane>
			    </Tabs>
	      </div>
      </div>
    );
  }
}

export default Setting;
