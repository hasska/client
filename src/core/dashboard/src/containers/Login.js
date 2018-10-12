/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';

import { Loading,Input,Button,Notification } from 'element-react';
import axios from 'axios';
import DashIcon from 'react-icons/lib/go/dashboard';
import LoginIcon from 'react-icons/lib/go/sign-in';

require('element-theme-default');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount() {
    if(window.location.href.search('auth')>=0){
      this.showMessage('Error','You access token expired ! Please sign in again !','error');
    }
  }
  componentWillReceiveProps(nextProps) {
    
  }
  showMessage(title,msg,type) {
    Notification({
      title: title,
      message: msg,
      type: type
    });
  }
  signIn(){
    const self = this;
    let url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/Users/login';
   
    axios.post(url,{
      email: this.state.email,
      password: this.state.password
    }).then( (body)=> {
      self.showMessage('Success','Signed in successfully !','success');
      localStorage.setItem('authorized_user', JSON.stringify(body.data));
      localStorage.setItem('auth',true);
      window.location.assign('/')
    }).catch( (error)=>{
      self.showMessage('Error',error.response.data.error.message,'error');
    })
  }

  render() {
    const _PATH = 'http://'+this.props.configs.HOST+":"+this.props.configs.PORT+'/';
    const _FAV_ICON = this.props.configs.FAV_ICON;
    return (
        <div className="login-form">
           <h2>{ _FAV_ICON ? <img src={_PATH+_FAV_ICON} /> : <DashIcon /> } { this.props.configs.PROJECT_BRAND }</h2>
           <p>Login To Admin Dashboard</p>
           <Input onChange={ (value)=>this.setState({'email':value}) } placeholder="Email" type="email"></Input>
           <Input onChange={ (value)=>this.setState({'password':value}) } placeholder="Password" value={this.state.password} type="password"></Input>
            <Button onClick={ ()=> this.signIn() } type="primary">Sign In</Button>
        </div>
    );
  }
}

export default Login;