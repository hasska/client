  import React, { Component } from 'react';

import { Popover, Progress, Loading, Tabs, Select, Icon, Dropdown } from 'element-react';

import haskaType from "../../dist/img/haska.svg";
import run from "../../dist/img/run.svg";
import stop from "../../dist/img/stop.svg";
import clean from "../../dist/img/clean.svg";

import { Redirect } from 'react-router'

const {ipcRenderer} = window.require('electron')

const ipc = window.ipc || {}

class Console extends Component {
  constructor(props){
    super(props)
    this.state = {
     errors: "",
     logs: "",
     logsInterval: null,
     errorsInterval: null,
     showConsole:true
    };
    ipc.messaging = {
      updateLogs: function(data) {
          ipcRenderer.send('update-logs', []);
      },
      updateErrors: function(data) {
          ipcRenderer.send('update-errors', []);
      }
    }
  }
  componentDidMount(){
    this.setIntervals();
  }
  triggerView(){
    if(this.state.showConsole==true){
      this.setState({showConsole: false});
    } else {
      this.setState({showConsole: true});
    }
  }
  setIntervals(){
    const self = this;
    //request for out logs every 3 sec
    this.state.logsInterval = setInterval( () => {
      ipc.messaging.updateLogs();
      ipcRenderer.on('update-logs-result', (event, arg) => {
        let _arg = arg.trim();
        _arg = _arg.replace(/(?:\r\n|\r|\n)/g, '<br />');
        /*for(let i in _arg){
          if(_arg[i].trim()=='')
            delete _arg[i];
        }*/
        self.setState({logs: _arg})
        self.scrollToBottom();
      });
    }, 5000);
    //request for errors every 5 sec
    this.state.errorsInterval = setInterval( () => {
      ipc.messaging.updateErrors();
      ipcRenderer.on('update-errors-result', (event, arg) => {
        let _arg = arg.trim();
        _arg = _arg.replace(/(?:\r\n|\r|\n)/g, '<br />');
        /*for(let i in _arg){
          if(_arg[i].trim()=='')
            delete _arg[i];
        }*/
        self.setState({errors: _arg})
        self.scrollToBottom()
      });
    }, 8000);
  }
  scrollToBottom() {
    const self = this;
    var logs = document.getElementById("logs-pane");
    if(logs)
      logs.scrollTop = logs.scrollHeight;

    var errors = document.getElementById("errors-pane");
    if(errors)
      errors.scrollTop = errors.scrollHeight;
  }
  clearLogs(){
    this.setState({logs: '',errors:''})
    clearInterval(this.state.logsInterval);
    clearInterval(this.state.errorsInterval);
    this.setIntervals();
  }
  render() {
    return (
    <div className={"app-editor-wrapper console-wrapper "+( this.state.showConsole == false && "closed-window-console" ) }>
      <div className="editor-actions">
        <a onClick={ ()=>this.clearLogs()} className="editor-clean"><span className="haskon-eraser"></span></a>
        <a onClick={ ()=>this.triggerView() }><i className={"el-icon-arrow-down "+( this.state.showConsole == false && "el-icon-arrow-up" )}></i></a>
      </div>

      { this.state.showConsole == true ? <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
        <Tabs.Pane className="tabsConsole" label="Logs" name="1">
          <div id="logs-pane" dangerouslySetInnerHTML={{ __html: this.state.logs.toString() }}></div>
        </Tabs.Pane>
        <Tabs.Pane className="tabsConsole" label="Errors" name="2">
          <div id="errors-pane" dangerouslySetInnerHTML={{ __html: this.state.errors.toString() }}></div>
        </Tabs.Pane>
      </Tabs>
       : <p onClick={ ()=>this.triggerView() } className="closed-logs"><Icon name={'warning'} /> Console Logs</p>}
    </div>
    );
  }
}

export default Console;
