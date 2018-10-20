/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Card, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import apiIcon from '../dist/img/api.png';

class ApiManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      preview: true,
      loading: false
    }
  }
  componentWillMount(){
    this.triggerView();
  }
  triggerView(){
    const self = this;
    if(this.props.progress.type!='RUN' && this.props.progress.status!='success'){
      self.showMessage('You have to RUN your project before start services :)',"error");
    }
    else {
      this.setState({loading: true,preview:false});
      this.props.updateWindows('api',true)
      setTimeout( ()=> {
        self.setState({loading: false})
        self.showMessage('Service Started ...',"success");
      },4000);
    } 
  }
  showMessage(message,type){
    Message({
      message: message || "",
      type: type || "warning"
    });
  }
  reload(){
    const webview = document.querySelector('webview')
    webview.reload();
  }
  render() {
    let project = this.props.project;
    let url = 'http://'+project.configs.SERVICE_HOST+':'+project.configs.SERVICE_PORT+"/explorer";
    return (
      <div>
      <Loading className="loading-custom" loading={this.state.loading} fullscreen={this.state.loading} text={"Loading API Explorer..."} />
      <div className="app-window">
        {
          this.props.windows.api == false ? <div className="preview-services">
            <div className="preview-services-image"><img src={apiIcon} /></div>
            <div className="preview-services-content">
              <h2>API Explorer</h2>
              <p>A place for exploring & tesging your rest-full APIs generated based on your models and custom methodes.</p>
              <Button onClick={()=>this.triggerView()} type="primary">Get Started</Button>
            </div>
          </div> :
        }
      </div>
      </div>
    );
  }
}

export default ApiManager;
