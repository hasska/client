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

import OverviewContainer from '../containers/Overview'
import ModelsManager from '../components/ModelsManager'
import DatabaseManager from '../components/DatabaseManager'
import ApiManager from '../components/ApiManager'
import AdminManager from '../components/AdminManager'
import DocsManager from '../components/DocsManager'
import MonitoringManager from '../components/MonitoringManager'
import DeployManager from '../components/DeployManager'


require('element-theme-default');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      active: 'overview'
    };
  }

  onChange(key, value) {
    this.state.info[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentWillMount() {
    console.log(this.props.match.path)
  }
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    console.log(this.props.match.path+'/models')
    return (
        <div>
          <LoggerPane prefix={"root@haska"} />
          <div className="app-wrapper">
              <ActionBar />
              <div className="app-body">
                  <Nav active={this.state.active} />
                  <div className="app-window-wrapper">
                    <div className="app-window">
                        <Route path={this.props.match.path+'/admin'} render={(props) => ( <AdminManager /> )} />
                        <Route path={this.props.match.path+'/monitoring'} render={(props) => ( <MonitoringManager /> )} />
                        <Route path={this.props.match.path+'/docs'} render={(props) => ( <DocsManager /> )} />
                        <Route path={this.props.match.path+'/deploy'} render={(props) => ( <DeployManager /> )} />
                        <Route path={this.props.match.path+'/api'} render={(props) => ( <ApiManager /> )} />
                        <Route path={this.props.match.path+'/databases'} render={(props) => ( <DatabaseManager /> )} />
                        <Route path={this.props.match.path+'/models'} render={(props) => ( <ModelsManager /> )} />
                        <Route path={this.props.match.path+'/overview'} render={(props) => ( <OverviewContainer /> )} />
                    </div>
                    <Console />
                  </div>
              </div>
          </div>
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
