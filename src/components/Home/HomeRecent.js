/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';

const {ipcRenderer} = window.require('electron')
const ipc = window.ipc || {}

class HomeRecent extends Component {
  constructor(props){
    super(props)
    ipc.messaging = {
        sendOpenMainProject: function(data) {
            ipcRenderer.send('main-project', data)
        }
    }
  }
  render() {
    return (
      <div onClick={ () => { ipc.messaging.sendOpenMainProject(this.props.data)} } className="home-app-recent">
        <div className="app-recent-logo">
          <img src={this.props.icon} width={32} />
        </div>
        <div className="app-recent-info">
          <div className="app-recent-title">
            <div className="t4">{this.props.name}</div>
            <i className="el-icon-arrow-right"></i>
          </div>
          <div className="t6">{this.props.destination}</div>
        </div>
      </div>
    );
  }
}

export default HomeRecent;
