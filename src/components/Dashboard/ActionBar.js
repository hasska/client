import React, { Component } from 'react';
import navOverview from "../../dist/img/nav-overview.svg";
import navModels from "../../dist/img/nav-models.svg";
import navDb from "../../dist/img/nav-db.svg";
import navApi from "../../dist/img/nav-api.svg";
import navAdmindashboard from "../../dist/img/nav-admindashboard.svg";
import navDocuments from "../../dist/img/nav-documents.svg";
import navMonitoring from "../../dist/img/nav-monitoring.svg";
import navStatistic from "../../dist/img/nav-statistic.svg";
import { Popover,Tooltip,Message, Progress, Loading, Button, Select, Icon, Dropdown } from 'element-react';

import logo from "../../dist/img/logo/haskafavicon.svg";

const {ipcRenderer} = window.require('electron')

const ipc = window.ipc || {}

class ActionBar extends Component {
  constructor(props){
    super(props)
    this.state = {
     progress: this.props.progress,
     timer: null,
     projects: []
    }
    ipc.messaging = {
      runProject: function(data) {
          ipcRenderer.send('start-project', []);
      },
      buildProject: function(data) {
          ipcRenderer.send('build-project', [])
      },
      stopProject: function(data) {
          ipcRenderer.send('stop-project', [])
      },
      cleanProject: function(data) {
          ipcRenderer.send('clean-project', [])
      },
      importProject: function(data) {
          ipcRenderer.send('import-project', data)
      }
    }
  }
  timer() {
    let time = this.state.progress.time;
    var self = this;
    let timeout = 50;

    if(this.state.progress.type=='BUILD')
      timeout = 1000;

    this.state.timer = window.setInterval(function(){
        time++;
        var _progress = self.state.progress;
        _progress['time'] = time;
        self.setState({'progress': _progress});

        if (time >= 100 || self.state.progress.inprogress == false ) {
            _progress['time'] = 100;
            self.setState({ 'progress': _progress})
            window.clearInterval(self.state.timer);
        }
    }, timeout);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.projects != this.state.projects){
      let projects = [];
      for(var i in nextProps.projects)
        projects[i] = JSON.parse(nextProps.projects[i]);

      this.setState({'projects':projects})
    }
  }
  showMessage(message,type){
    Message({
      message: message || "",
      type: type || "warning"
    });
  }
  clearProgress(msg,type){
    const self = this;
    setTimeout( () => {
      let _progress = self.state.progress;
      _progress['time'] = 100;
      _progress['status'] = self.state.progress.status;
      _progress['text'] = msg;
      _progress['inprogress'] = false;
      _progress['type'] = type;
      self.setState({progress: _progress});
      this.props.updateProgress(_progress);
    },2000);
  }
  run(){
    ipc.messaging.runProject();
    let _progress = this.state.progress;
    _progress['time'] = 0;
    _progress['status'] = '';
    _progress['text'] = 'Preparing for run...';
    _progress['inprogress'] = true;
    _progress['type'] = 'RUN';
    this.setState({progress: _progress});
    this.props.updateProgress(_progress);
    this.timer();
  }
  build(){
    ipc.messaging.buildProject();
    let _progress = this.state.progress;
    _progress['time'] = 0;
    _progress['status'] = '';
    _progress['text'] = 'Install & Building Modules ...';
    _progress['inprogress'] = true;
    _progress['type'] = 'BUILD';
    this.setState({progress: _progress});
    this.props.updateProgress(_progress);

    this.timer();
  }
  stop(){
    ipc.messaging.stopProject();
    let _progress = this.state.progress;
    _progress['time'] = 0;
    _progress['status'] = '';
    _progress['text'] = 'Stopping Services ...';
    _progress['inprogress'] = true;
    _progress['type'] = 'STOP';
    this.setState({progress: _progress});
    this.props.updateProgress(_progress);

    this.timer();
  }
  clean(){
    ipc.messaging.cleanProject();
    let _progress = this.state.progress;
    _progress['time'] = 0;
    _progress['status'] = '';
    _progress['text'] = 'Cleaning Resources ...';
    _progress['inprogress'] = true;
    _progress['type'] = 'CLEAN';
    this.setState({progress: _progress});
    this.props.updateProgress(_progress);

    this.timer();
  }
  importProject(project){
    ipc.messaging.importProject(project)
  }
  componentWillMount() {
    const self = this;

//    ipc.messaging.getProjectInfo();
    ipcRenderer.on('start-project-result', (event, arg) => {
        let _progress = self.state.progress;
        _progress['time'] = 100;
        _progress['inprogress'] = false;

      if(arg.status=='success'){
        _progress['status'] = 'success';
        _progress['text'] = 'Running Successfully';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.clearProgress('Up & Running','RUN');
      } else {
        _progress['status'] = 'exception';
        _progress['text'] = 'Running Failed !';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.clearProgress('Run Failed !','RUN');
      }

    })


    ipcRenderer.on('stop-project-result', (event, arg) => {
      console.log(arg)
        let _progress = self.state.progress;
        _progress['time'] = 100;
        _progress['inprogress'] = false;

      if(arg.status=='success'){
        _progress['status'] = 'success';
        _progress['text'] = 'Stopped Successfully';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.clearProgress('Stopped Services','KICKOFF');
      } else {
        _progress['status'] = 'exception';
        _progress['text'] = 'Stop Failed !';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.clearProgress('Stop Failed !','STOP');
      }

    })

    ipcRenderer.on('clean-project-result', (event, arg) => {
      console.log(arg)
        let _progress = self.state.progress;
        _progress['time'] = 100;
        _progress['inprogress'] = false;

      if(arg.status=='success'){
        self.props.updateProject(arg.project);
        _progress['status'] = 'success';
        _progress['text'] = 'Cleaned Successfully';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.clearProgress('Cleaned Resources','CLEAN');
        self.showMessage("Project Cleaned Successfully :)","success");
      } else {
        _progress['status'] = 'exception';
        _progress['text'] = 'Clean Failed !';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.clearProgress('Clean Failed !','CLEAN');
        self.showMessage("Project Cleaned Failed :(","error");
      }

    })

    ipcRenderer.on('build-project-result', (event, arg) => {
      let _progress = self.state.progress;
      _progress['time'] = 100;
      _progress['inprogress'] = false;

      if(arg.status=='success'){
        self.props.updateProject(arg.project);
        _progress['status'] = 'success';
        _progress['text'] = 'Build Successfully';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.showMessage("Project Build Successfully :)","success");
        self.clearProgress('Build Successfully !','BUILD');

      } else {
        self.props.updateProject(arg.project);
        _progress['status'] = 'exception';
        _progress['text'] = 'Build Failed !';
        self.setState({progress: _progress});
        self.props.updateProgress(_progress);

        self.showMessage("Project Build Failed :(","error");
        self.clearProgress('Build Failed !','BUILD');
      }
    })
  }
  render() {
    let projects = [];
    this.state.projects.length > 0 && this.state.projects.map( (el) => {
      if( el.name == this.props.project.name)
        projects.push(<p className="project-item active-project">{el.name}</p>)
      else
        projects.push(<p onClick={ () => this.importProject(el)} className="project-item">{el.name}</p>)
    })
    return (
    <div className="app-header">
      <div className="window-actions">
        <div className="name">
          haska
        </div>
      </div>
      <div className="header-layout">
        <div className="header-left">
          <div className="project-name">
              <Popover placement="bottom" title="Recent Projects" width="180" trigger="click" content={(
              <div>{
                projects
              }</div>)}>
                <div><img src={logo} height="30px" alt="rootvision" /><span> {this.props.project.name} <i className="el-icon-arrow-down"></i></span></div>
              </Popover>
          </div>
        </div>
        <div className="header-center">
          <div className="project-status-wrapper">
            <div className="project-name">
              { this.state.progress.type }
            </div>
            <div className="project-status">
              { this.state.progress.text }
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="project-actions">
            <a className="action-main-run" onClick={ ()=>this.run() }>
              <span className="haskon-controller-play"></span>
            </a>
            <a className="action-stop" onClick={ ()=>this.stop() }>
              <span className="haskon-controller-stop"></span>
            </a>
          </div>
        </div>
      </div>
      <div className="progress-bar">
        <Progress percentage={this.state.progress.time} status={this.state.progress.status} showText={false}/>
      </div>
    </div>
    );
  }
}

export default ActionBar;
