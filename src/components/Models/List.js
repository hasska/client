/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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

class ModelsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: this.props.active,
      navigate: false
    }
  }

  render() {
    let list = [];

    for( let model in this.props.models ){
      model = this.props.models[model];
      let cname = this.props.selectedModel.toString() == model.name.toString() ? 'active' : '';

      list.push(<li onClick={ ()=>this.props.switchModel(model.name) } className={ cname }><h6>{model.name}</h6> <i className="el-icon-arrow-right"></i></li>);
    }

    return (
      <div className="app-nav">
          <div className="app-sub-nav sub-nav-model">
            <div className="sub-nav-header">
              <div className="sub-nav-title">
                <h5>Models</h5>
              </div>
              <div className="sub-nav-action">
                <a onClick={ ()=>this.props.newModel() } className="app-button icon-button">
                  <i className="el-icon-plus"></i>
                </a>
              </div>
            </div>

            <div className="sub-nav-body">
              <ul>
                {
                  list
                }
              </ul>
            </div>
          </div>
      </div>
    );
  }
}

export default ModelsList;
