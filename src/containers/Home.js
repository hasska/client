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
import HomeIntro from '../components/Home/HomeIntro';
import HomeStart from '../components/Home/HomeStart';

const {ipcRenderer} = window.require('electron')
const ipc = window.ipc || {}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []  
    };
    ipc.messaging = {
      getProjects: function(data) {
          ipcRenderer.send('projects-list', [])
      }
    }
  }
  componentWillMount() {
    const self = this;
    ipc.messaging.getProjects();

    ipcRenderer.on('projects-list-result', (event, arg) => {
      self.setState({'projects':arg});
    });
  }
  render() {
    return (
        <div>
          <div className="home-wrapper">
              <div className="home-body">
                <HomeIntro />
                <HomeStart projects={this.state.projects} />
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
export default withRouter(connect(mapStateToProps)(Home));
