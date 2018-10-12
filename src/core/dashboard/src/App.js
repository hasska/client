/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";
import { fetchModels } from './fetchModels';
import { configs } from './configs';

import Header from './components/Header'
import Footer from './components/Footer'

import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import Unavailable from './containers/Unavailable'

import axios from 'axios';
import { Loading,Notification } from 'element-react';
import 'element-theme-default';

const PROJECT_PATH = configs.PROJECT_PATH;
const PROJECT_BRAND = configs.PROJECT_BRAND;

if(configs.DISABLE_ADMIN){
  window.location.assign('#/unavailable');
}

axios.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.status == 422){
    window.location.assign('/signin?auth=false');
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default class MainApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      configs: configs,
      loading: true,
      models: null,
      dynamics_routes: null
    }
  }
  showMessage(title,msg,type) {
    Notification({
      title: title,
      message: msg,
      type: type,
      token: null,
      fullscreen:true,
      redirect:false,
      redirect_url: null
    });
  }
  checkAuth(){
    let _id = null;
    const self = this;

    if(JSON.parse(localStorage.getItem('authorized_user')))
      _id = JSON.parse(localStorage.getItem('authorized_user')).userId;

    const url = 'http://'+configs.SERVICE_HOST+':'+configs.SERVICE_PORT+'/api/Users/'+_id+'/accessTokens';
    
    axios.get(url,{
      headers: {
        'Authorization': self.state.token
      }
    }).then( (body) => {
      self.setState({loading: false,fullscreen:false});
      if(window.location.assign.indexOf('signin')>0)
        self.setState({redirect:true,redirect_url:''});
    }).catch( (ex) => {
      self.setState({loading: false,fullscreen:false});
      //self.showMessage('Error',ex.toString(),'error')
    });
  }
  componentWillMount() {

    const self = this;
    let _token = '';

    if(localStorage.getItem('authorized_user')){
      _token = JSON.parse(localStorage.getItem('authorized_user')).id || null;
      self.setState({token: _token})
    }

    fetchModels(configs,_token,(models,dynamics_routes) => {
      delete models.uploads;
      self.setState({ auth: localStorage.getItem('auth') || false,
                      fullscreen:false,loading: false,
                      dynamics_routes: dynamics_routes, models: models })
      self.checkAuth();
    });
    
    let authorized_user = localStorage.getItem('authorized_user');
    if( ( typeof authorized_user == "undefined" || authorized_user == null ) && 
         window.location.href.indexOf('signin') < 0 ){
      window.location.assign('/signin');
      localStorage.setItem('auth',false);
    }

  }
  render() {
    return ( !this.state.loading &&
      <Router>
        <div>
          <Loading loading={this.state.loading} fullscreen={this.state.fullscreen} />
          <Header token={this.state.token} configs={configs} models={this.state.models} brand={this.state.configs.PROJECT_BRAND} />
          <div className="main-layout">
            <Route exact path="/" render={(props) => ( <Dashboard token={this.state.token} configs={this.state.configs} models={this.state.models} /> )} />
            <Route path="/dashboard" render={(props) => ( <Dashboard token={this.state.token} configs={this.state.configs} models={this.state.models} /> )} />
            <Route path="/signin" render={(props) => ( <Login configs={this.state.configs} /> )} />
            <Route path="/unavailable" component={Unavailable} />
            {
              this.state.dynamics_routes
            }
            <Footer brand={this.state.configs.PROJECT_BRAND} />
          </div>
          {
            this.state.redirect ? <Redirect to={this.state.redirect_url} /> : null 
          }
        </div>
      </Router>
    )
  }
}
