import React, { Component } from 'react';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Card, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import apiIcon from '../dist/img/monitor.png';

class MonitoringManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      preview: true,
      loading: false
    }
  }
  triggerView(){
    const self = this;
    const webview = document.querySelector('webview')
    if(this.props.progress.type!='RUN' && this.props.progress.status!='success'){
      self.showMessage('You have to RUN your project before start services :)',"error");
    }
    else if(this.props.project.build==true){
      this.setState({loading: true,preview:false});
      setTimeout( ()=> {
        self.setState({loading: false})
        self.showMessage('Service Started ...',"success");
      },4000);
    } else {
      self.showMessage('You have to build your project once before start services :)',"error");
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
    let url = 'http://'+project.configs.SERVICE_HOST+':'+project.configs.SERVICE_PORT+'/swagger-stats/ui';

    return (
      <div>
      <Loading className="loading-custom" loading={this.state.loading} fullscreen={this.state.loading} text={"Loading Monitorings..."} />
      <div className="app-window">
        {
          this.state.preview ? <div className="preview-services">
            <div className="preview-services-image"><img src={apiIcon} /></div>
            <div className="preview-services-content">
              <h2>Monitoring & Statistics</h2>
              <p>A place for monitoring your services and be aware about your project status and outputs by statistics.</p>
              <Button onClick={()=>this.triggerView()} type="primary">Watch Monitoring</Button>
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

export default MonitoringManager;
