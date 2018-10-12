/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'


import { Popover, Progress, Dialog, Loading, Tabs, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../components/Title';
import clean from "../dist/img/clean.svg";

import LoggerPane from '../components/LoggerPane'
import Nav from '../components/Dashboard/Nav'
import ActionBar from '../components/Dashboard/ActionBar'
import Console from '../components/Dashboard/Console'
import { BrowserRouter, Route } from 'react-router-dom';

require('element-theme-default');

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      navigate: false,
    };
  }
  changeRoute(route){
    this.props.switchActive(route);
    this.setState({'active':route,navigate:true});
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  render() {

    return (
      <div className="app-top">
        { this.state.navigate && <Redirect to={"/dashboard/"+this.state.active} push={true} />}
        <div className="overview-container">
          <div className="overview-top">
            <div className="t4">Project Overview</div>
            <div className="t1">Getting started here</div>
            <div className="get-started-tips">
              <div onClick={ ()=>this.changeRoute('models')} className="get-started-card">
                <div className="get-started-circle">
                  <span className="haskon-lab"></span>
                </div>
                <div className="get-started-text">
                  Create your Models
                </div>
              </div>
              <div onClick={ ()=>this.changeRoute('databases')} className="get-started-card">
                <div className="get-started-circle">
                  <span className="haskon-database"></span>
                </div>
                <div className="get-started-text">
                  Create your databases
                </div>
              </div>
              <div onClick={ ()=>this.changeRoute('deploy')} className="get-started-card">
                <div className="get-started-circle">
                  <span className="haskon-rocket"></span>
                </div>
                <div className="get-started-text">
                  Deploy your services
                </div>
              </div>
            </div>
          </div>
          <div className="overview-bottom">
            <div className="discover-header">
              Discover Haska Services
            </div>
            <div className="discover-card-container">

              <div className="discover-card">
                <div className="card-header">
                  <div className="icon">
                    <span className="haskon-cogs"></span>
                  </div>
                  <div className="title">
                    APIs
                  </div>
                </div>
                <div className="description">
                  Generate rest-ful API endpoints list based on models
                </div>
                <div className="action">
                  <Button onClick={ ()=>this.changeRoute('api')} className="app-button">Get Started</Button>
                </div>
              </div>

              <div className="discover-card">
                <div className="card-header">
                  <div className="icon">
                    <span className="haskon-dashboard"></span>
                  </div>
                  <div className="title">
                    Admin Dashboard
                  </div>
                </div>
                <div className="description">
                Manage your data in your database and services
                </div>
                <div className="action">
                  <Button onClick={ ()=>this.changeRoute('admin')} className="app-button">Get Started</Button>
                </div>
              </div>

              <div className="discover-card">
                <div className="card-header">
                  <div className="icon">
                    <span className="haskon-display"></span>
                  </div>
                  <div className="title">
                    Monitoring
                  </div>
                </div>
                <div className="description">
                  Get report and Monitoring your services and errors
                </div>
                <div className="action">
                  <Button onClick={ ()=>this.changeRoute('monitoring')} className="app-button">Get Started</Button>
                </div>
              </div>

              <div className="discover-card">
                <div className="card-header">
                  <div className="icon">
                    <span className="haskon-books"></span>
                  </div>
                  <div className="title">
                    Documentation
                  </div>
                </div>
                <div className="description">
                Generate full documentation based on your models
                </div>
                <div className="action">
                  <Button onClick={ ()=>this.changeRoute('docs')} className="app-button">Get Started</Button>
                </div>
              </div>

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
//export default withRouter(connect(mapStateToProps)(Overview));
export default Overview;
