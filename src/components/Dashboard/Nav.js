/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Tooltip } from 'element-react';
import { Redirect } from 'react-router'

class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: this.props.active,
      navigate: false,
      maximizeNav: true,

    }
  }

  changeRoute(route){
    this.props.switchActive(route);
    this.setState({'active':route,navigate:true});
  }

  triggerView(){
    if(this.state.maximizeNav==true){
      this.setState({maximizeNav: false});
    } else {
      this.setState({maximizeNav: true});
    }
  }
  render() {
    return (
      <div className={"app-nav "+( this.state.maximizeNav == false && "minimze-nav" )}>
        { this.state.navigate && <Redirect to={"/dashboard/"+this.state.active} push={true} />}
        <div className="nav-actions nav-actions-settings">
          <a><i className={"el-icon-arrow-left "+( this.state.maximizeNav == false && "el-icon-arrow-right" )}></i></a>
        </div>
        <ul className="nav-container">
          <li className={ this.props.active == 'overview'?'active':'' }>
            <span></span>
            <div className="nav-section">
              <div onClick={ ()=>this.changeRoute('overview')}><span className="haskon-home"></span></div>
              <div onClick={ ()=>this.changeRoute('overview')}>Overview</div>
              <div onClick={ ()=>this.changeRoute('perferences') } className="app-setting"><Tooltip placement="right" content="Settings"><i className="el-icon-setting"></i></Tooltip></div>
            </div>
          </li>
          <li className={ this.props.active == 'models'?'active':'' }>
            <span></span>
            <div onClick={ ()=>this.changeRoute('models')} className="nav-section">
              <div><span className="haskon-lab"></span></div>
              <div>Models</div>
            </div>
          </li>
          <li className={ this.props.active == 'databases'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('databases')} className="nav-section">
              <div><span className="haskon-database"></span></div>
              <div>Databases</div>
            </div>
          </li>
          <div className="nav-line"></div>

          <li className={ this.props.active == 'api'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('api')} className="nav-section">
              <div><span className="haskon-cogs"></span></div>
              <div>APIs</div>
            </div>
          </li>
          <li className={ this.props.active == 'admin'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('admin')} className="nav-section">
              <div><span className="haskon-dashboard"></span></div>
              <div>Admin Dashboard</div>
            </div>
          </li>
          <li className={ this.props.active == 'monitoring'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('monitoring')} className="nav-section">
              <div><span className="haskon-display"></span></div>
              <div>Monitoring</div>
            </div>
          </li>
          <li className={ this.props.active == 'docs'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('docs')} className="nav-section">
              <div><span className="haskon-books"></span></div>
              <div>Documentations</div>
            </div>
          </li>
          <li className={ this.props.active == 'deploy'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('deploy')} className="nav-section">
              <div><span className="haskon-rocket"></span></div>
              <div>Deployments</div>
            </div>
          </li>
          <li className={ this.props.active == 'apps'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('apps')} className="nav-section">
              <div><span className="haskon-apps"></span></div>
              <div>Apps</div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
