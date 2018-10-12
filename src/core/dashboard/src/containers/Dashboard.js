/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Loading,Layout,Card,Button } from 'element-react';
import UserIcon from 'react-icons/lib/go/organization';
import DirIcon from 'react-icons/lib/go/repo';
import axios from 'axios';

require('element-theme-default');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      models: this.props.models
    };
  }
  componentWillMount() {
    this.getModelsCounts();
  }
  componentWillReceiveProps(nextProps) {
   // if(nextProps.models != this.state.models){
      this.setState({ models: nextProps.models })
   // }
  }
  getModelsCounts() {
    const self = this;
    let models = this.state.models;
    for(var model in models){
      this.getModelCount(model,(count,model) => {
        let tmpData = self.state.models;
        tmpData[model]['count'] = count;
        self.setState({ models: tmpData });
      })
    }
  }
  getModelCount(model,callback){
    const url = 'http://'+this.props.configs.SERVICE_HOST+":"+this.props.configs.SERVICE_PORT+'/api/';
    axios.get(url+model+'s/count',{
      headers: {
        'Authorization': this.props.token
      }
    }).then( (response) => {
      callback(response.data.count,model);
    }).then( (response) => {
    }).catch( (ex) => {
      callback(0,model);
    })
  }
  render() {
    let models = [],_models = this.state.models;

    Object.keys(_models).map(function (key,model) {
        models.push(<Layout.Col xs="12" sm="12" md="6" lg="6">
          <Card bodyStyle={{ padding: 0 }}>
            <div style={{ padding: 14 }}>
              <Link className="title" to={`/${key}`}><p>{ key == 'User' ? <UserIcon /> : <DirIcon /> } { key }</p></Link>
              <div className="bottom clearfix">
                <span><b>{_models[key].count}</b> Items</span>
                <Link className="btn-add" to={`/${key}`+'s/create'}><i className='el-icon-plus'></i></Link>
              </div>
            </div>
          </Card>
        </Layout.Col>);
    })

    return (
        <div>
          <Layout.Row>
            {
              models
            }
          </Layout.Row>
        </div>
    );
  }
}

export default Dashboard;