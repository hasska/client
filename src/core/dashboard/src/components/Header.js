/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Loading,Menu,SubMenu,Tooltip,Notification } from 'element-react';
import axios from 'axios';
import DotIcon from 'react-icons/lib/go/primitive-dot';
import HomeIcon from 'react-icons/lib/go/dashboard';
import HIcon from 'react-icons/lib/go/home';
import GearIcon from 'react-icons/lib/go/gear';
import OutIcon from 'react-icons/lib/go/sign-out';

require('element-theme-default');

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      redirect_url: "",
      loading: false,
      fullscreen: false,
      userId: null
    }
  }
  componentDidMount(){
    var _id = null;
    if(JSON.parse(localStorage.getItem('authorized_user')))
      _id = JSON.parse(localStorage.getItem('authorized_user')).userId;
    this.setState({userId: _id});
  }
  showMessage(title,msg,type) {
    Notification({
      title: title,
      message: msg,
      type: type
    });
  }
  signOut(){

    const self = this;
    self.setState({loading: true,fullscreen: true});
    
    let url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/Users/logout';
    axios.post(url,{},{
      headers: {
        'Authorization': self.props.token
      }
    }).then( (body)=> {
      self.showMessage('Success','Signed out successfully !','success');
      self.setState({loading: false,fullscreen: false});
      localStorage.removeItem('authorized_user');
      localStorage.setItem('auth',false);
      window.location.assign('/signin');
    }).catch( (error)=>{
      self.setState({loading: false,fullscreen: false});
      self.showMessage('Error',error.response.data.error.message,'error');
    })
  }
  redirect(to,el){
    this.setState({redirect: true,redirect_url: to})
  }
  render() {
    let menus = [], top_menu = [];

    Object.keys(this.props.models).map(function (model) {
      menus.push(<li><DotIcon /> <Link to={`/${model}`}>{model}</Link></li>);
    })

    let auth_status = localStorage.getItem('auth') || false;
  
    const _PATH = 'http://'+this.props.configs.HOST+':'+this.props.configs.PORT+'/';
    let favIcon = this.props.configs.FAV_ICON ? <img src={_PATH+this.props.configs.FAV_ICON} /> : <HIcon /> 
    
    top_menu.push(<li onClick={ ()=> this.signOut() }><Link className="btn-desktop" to="#"><Tooltip placement="bottom" content={"Sign Out"}><OutIcon size={20} /></Tooltip></Link></li>);
    top_menu.push(<li><Link className="btn-desktop" to={"/Users/update/"+this.state.userId}><Tooltip placement="bottom" content={"Admin Profile"}><GearIcon size={23} /></Tooltip></Link></li>);
    top_menu.push(<li><Link className="btn-desktop" to=""><Tooltip placement="bottom" content={"Dashboard"}><HomeIcon size={23} /></Tooltip></Link></li>);

    return (
      <div>
          <div className="navbar">
          {
            auth_status.toString() == "true" ? <div>
          <div><Menu defaultActive="1" className="el-menu-demo" mode="horizontal">
              <Menu.Item onClick={ (el) => this.redirect('',el) } className="brand" index="0">{ favIcon } { this.props.brand }</Menu.Item>
              <ul className="topMenu">
              {
                top_menu
              }
            </ul>      
            </Menu> 
             
          </div>
          <div className="sub-navbar">
            <ul>
              {
                menus
              }
            </ul>
          </div></div> : null
          }
          {
            (this.state.redirect) ? <Redirect to={this.state.redirect_url}/> : null
          }
          </div>
          <Loading loading={this.state.loading} text="Signing out ..." fullscreen={this.state.fullscreen}></Loading>
      </div>
    );
  }
}

export default Header;