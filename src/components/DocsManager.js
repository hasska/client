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

import apiIcon from '../dist/img/docs.png';

class DocsManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      preview: true,
      loading: false
    }
  }
  showMessage(message,type){
    Message({
      message: message || "",
      type: type || "warning"
    });
  }
  triggerView(){
    const self = this;
    const webview = document.querySelector('webview')
    if(this.props.progress.type!='RUN' && this.props.progress.status!='success'){
      self.showMessage('You have to RUN your project before start services :)',"error");
    }
    else {
      this.setState({loading: true,preview:false});
      setTimeout( ()=> {
        self.setState({loading: false})
        self.showMessage('Service Started ...',"success");
      },2000);
    }
  }
  reload(){
    const webview = document.querySelector('webview')
    webview.reload();
  }
  render() {

    let project = this.props.project;
    let url = 'file://'+project.destination+'/public/docs.html';

    return (
      <div>
      <Loading className="loading-custom" loading={this.state.loading} fullscreen={this.state.loading} text={"Loading API Explorer..."} />
      <div className="app-window">
        {
          this.state.preview ? <div className="preview-services">
            <div className="preview-services-image"><img src={apiIcon} /></div>
            <div className="preview-services-content">
              <h2>Documentations</h2>
              <p>A place for managing & exporting your project generated documentations based on your API's.</p>
              <Button onClick={()=>this.triggerView()} type="primary">Read Documentations</Button>
            </div>
          </div> :
          <div className="frame-services">
            <webview src={url} style={{width:"100%"}}></webview>
          </div>
        }
      </div>
      </div>
    );
  }
}

export default DocsManager;
