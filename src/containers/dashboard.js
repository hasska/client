import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Popover, Progress, Dialog, Loading, Tabs, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../components/Title';
import clean from "../dist/img/clean.svg";

import LoggerPane from '../components/LoggerPane'
import Nav from '../components/Dashboard/Nav'
import ActionBar from '../components/Dashboard/ActionBar'
import Console from '../components/Dashboard/Console'
import { BrowserRouter, Route } from 'react-router-dom';

import OverviewContainer from '../components/Overview'
import ModelsManager from '../components/ModelsManager'
import DatabaseManager from '../components/Database/DatabaseManager'
import ApiManager from '../components/ApiManager'
import AdminManager from '../components/AdminManager'
import DocsManager from '../components/DocsManager'
import MonitoringManager from '../components/MonitoringManager'
import DeployManager from '../components/DeployManager'
import SettingContainer from '../components/Setting/Setting'
import AppsContainer from '../components/Apps'

const {ipcRenderer} = window.require('electron')

const ipc = window.ipc || {}
require('element-theme-default');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      active: 'overview',
      progress: {
        inprogress: false,
        type: 'KICKOFF',
        time: 0,
        text: 'Ready to Start',
        status: ''
      },
      windows: {
        api: false,
        admin: false,
        monitoring: false,
        docs: false
      },
      project: [],
      projects: []
    };
    ipc.messaging = {
      getProjectInfo: function(data) {
          ipcRenderer.send('project-info', [])
      },
      getProjects: function(data) {
          ipcRenderer.send('projects-list', [])
      }
    }

    this.updateProject = this.updateProject.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.updateWindows = this.updateWindows.bind(this);
  }

  updateWindows(key,value){
    let _windows = this.state.windows;
    _windows[key] = value;
    this.setState({windows: _windows})
  }

  updateProgress(progress){
    this.setState({'progress': progress})
  }

  updateProject(project){
      this.setState({'project': project})
  }

  onChange(key, value) {
    this.state.info[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentWillMount() {
    const self = this;
    ipc.messaging.getProjectInfo();
    ipc.messaging.getProjects();
    ipcRenderer.on('project-info-result', (event, arg) => {
      console.log(arg)
      self.setState({'project':arg});
    });
    ipcRenderer.on('projects-list-result', (event, arg) => {
      self.setState({'projects':arg});
    });
  }


  render() {
    return (
        <div>
          <Loading loading={this.state.project.length==0} fullscreen={this.state.project.length==0} text={"Loading Project ..."} />
          { this.state.project.length != 0 &&
            <div className="app-wrapper">
              <ActionBar updateProgress={this.updateProgress} updateProject={this.updateProject} projects={this.state.projects} project={this.state.project} progress={this.state.progress} />
              <div className="app-body">
                  <Nav active={this.state.active} />
                  <div className="app-window-wrapper">
                    <div className="app-window">
                        <Route path={this.props.match.path+'/admin'} render={(props) => ( <AdminManager updateWindows={this.updateWindows} windows={this.state.windows} project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/monitoring'} render={(props) => ( <MonitoringManager updateWindows={this.updateWindows} windows={this.state.windows} project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/docs'} render={(props) => ( <DocsManager updateWindows={this.updateWindows} windows={this.state.windows} project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/deploy'} render={(props) => ( <DeployManager project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/api'} render={(props) => ( <ApiManager updateWindows={this.updateWindows} windows={this.state.windows} project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/databases'} render={(props) => ( <DatabaseManager project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/models'} render={(props) => ( <ModelsManager project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/overview'} render={(props) => ( <OverviewContainer project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/apps'} render={(props) => ( <AppsContainer project={this.state.project} progress={this.state.progress} /> )} />
                        <Route path={this.props.match.path+'/perferences'} render={(props) => ( <SettingContainer project={this.state.project} progress={this.state.progress} /> )} />
                    </div>
                  </div>
            </div>
        </div>}
      </div>
    );
  }
}

// mapped props to the component
const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

// Inject the Params provided by React Router into connected components
export default withRouter(connect(mapStateToProps)(Dashboard));
