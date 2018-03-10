import React, { Component } from 'react';
import navOverview from "../../dist/img/nav-overview.svg";
import navModels from "../../dist/img/nav-models.svg";
import navDb from "../../dist/img/nav-db.svg";
import navApi from "../../dist/img/nav-api.svg";
import navAdmindashboard from "../../dist/img/nav-admindashboard.svg";
import navDocuments from "../../dist/img/nav-documents.svg";
import navMonitoring from "../../dist/img/nav-monitoring.svg";
import navStatistic from "../../dist/img/nav-statistic.svg";
import { Popover, Progress, Loading, Button, Select, Icon, Dropdown } from 'element-react';

import haskaType from "../../dist/img/haska.svg";
import run from "../../dist/img/run.svg";
import stop from "../../dist/img/stop.svg";
import clean from "../../dist/img/clean.svg";
import build from "../../dist/img/build.svg";
import publish from "../../dist/img/publish.svg";


class ActionBar extends Component {
  constructor(props){
    super(props)
    this.state = {
     
    }
  }
  render() {
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
              monosority <i className="el-icon-arrow-down"></i>
          </div>
        </div>
        <div className="header-center">
          <div className="project-status-wrapper">
            <div className="project-name">
              monosority
            </div>
            <div className="project-status">
              Build succeeded!
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="project-actions">
            <a className="action-main-run">
              <Popover placement="bottom" width="40" trigger="focus" content={(
                  <div className="action-container">
                    <a className="action-run">Run</a>
                    <a className="action-build">Build</a>
                    <a className="action-publish">Publish</a>
                  </div>
                )}>
                <img src={run} />
              </Popover>
            </a>
            <a className="action-stop"><img src={stop} /></a>
          </div>
        </div>
      </div>
      <div className="progress-bar">
        <Progress percentage={30} showText={false}/>
      </div>
    </div>
    );
  }
}

export default ActionBar;