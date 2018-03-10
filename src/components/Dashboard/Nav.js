import React, { Component } from 'react';
import navOverview from "../../dist/img/nav-overview.svg";
import navModels from "../../dist/img/nav-models.svg";
import navDb from "../../dist/img/nav-db.svg";
import navApi from "../../dist/img/nav-api.svg";
import navAdmindashboard from "../../dist/img/nav-admindashboard.svg";
import navDocuments from "../../dist/img/nav-documents.svg";
import navMonitoring from "../../dist/img/nav-monitoring.svg";
import navStatistic from "../../dist/img/nav-statistic.svg";

import { Redirect } from 'react-router'

class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: this.props.active,
      navigate: false
    }
  }
  changeRoute(route){
    this.setState({'active':route,navigate:true});
  }
  render() {
    return (
      <div className="app-nav">
        { this.state.navigate && <Redirect to={"/dashboard/"+this.state.active} push={true} />}
        <div className="nav-collapse">
          <a><i className="el-icon-arrow-left"></i></a>                      
        </div>
        <ul className="nav-container">
          <li className={ this.state.active == 'overview'?'active':'' }>
            <span></span>
            <div onClick={ ()=>this.changeRoute('overview')} className="nav-section">
              <div><img src={navOverview} /></div>
              <div>Overview</div>
            </div>
          </li>
          <li className={ this.state.active == 'models'?'active':'' }>
            <span></span>
            <div onClick={ ()=>this.changeRoute('models')} className="nav-section">
              <div><img src={navModels} /></div>
              <div>Models</div>
            </div>
          </li>
          <li className={ this.state.active == 'database'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('database')} className="nav-section">
              <div><img src={navDb} /></div>
              <div>Databases</div>
            </div>
          </li>
          <li className={ this.state.active == 'api'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('api')} className="nav-section">
              <div><img src={navApi} /></div>
              <div>APIs</div>
            </div>
          </li>
          <li className={ this.state.active == 'admin'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('admin')} className="nav-section">
              <div><img src={navAdmindashboard} /></div>
              <div>Admin Dashboard</div>
            </div>
          </li>
          <li className={ this.state.active == 'monitoring'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('monitoring')} className="nav-section">
              <div><img src={navMonitoring} /></div>
              <div>Monitoring</div>
            </div>
          </li>
          <li className={ this.state.active == 'statistics'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('statistics')} className="nav-section">
              <div><img src={navStatistic} /></div>
              <div>Statistics</div>
            </div>
          </li>
          <li className={ this.state.active == 'docs'?'active':'' }>
            <span></span>
            <div onClick={()=>this.changeRoute('docs')} className="nav-section">
              <div><img src={navDocuments} /></div>
              <div>Documentation</div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
