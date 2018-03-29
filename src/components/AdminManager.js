import React, { Component } from 'react';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Card, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import apiIcon from '../dist/img/bulletin_board.png';

class AdminManager extends Component {
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
      this.props.updateWindows('admin',true)
      setTimeout( ()=> {
        self.setState({loading: false})
        self.showMessage('Service Started ...',"success");
      },3000);
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
    let url = 'http://'+project.configs.admin.HOST+':'+project.configs.admin.PORT;

    return (
      <div>
      <Loading className="loading-custom" loading={this.state.loading} fullscreen={this.state.loading} text={"Loading Admin Dashboard..."} />
      <div className="app-window">
        {
          this.props.windows.admin == false ? <div className="preview-services">
            <div className="preview-services-image"><img src={apiIcon} /></div>
            <div className="preview-services-content">
              <h2>Admin Dashboard</h2>
              <p>Need data entry? Use admin dashboard for managing and working with data's in databases of your project.</p>
              <Button onClick={()=>this.triggerView()} type="primary">Open Admin Dashboard</Button>
              <Button type="default">Configurations</Button>
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

export default AdminManager;
