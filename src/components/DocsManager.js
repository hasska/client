import React, { Component } from 'react';
import { Popover, Message, Progress, Dialog, Loading, Tabs, Form, Input,
   Checkbox, Card, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import apiIcon from '../dist/img/book.png';

class DocsManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      preview: true,
      loading: false
    }
  }
  triggerView(){
    const self = this;
    this.setState({loading: true,preview:false});
    setTimeout( ()=> {
      self.setState({loading: false})
    },4000);
  }
  reload(){
    const webview = document.querySelector('webview')
    webview.reload();
  }
  render() {
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
            <webview src="http://127.0.0.1:3006" style={{width:"100%"}}></webview>
          </div>
        }
      </div>
      </div>
    );
  }
}

export default DocsManager;
