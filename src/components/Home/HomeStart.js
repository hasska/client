/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import HomeRecent from './HomeRecent';
import Title from './../Title';
import newIcon from "../../dist/img/newAppIcon.svg";
import appIcon from "../../dist/img/repo.svg";

const {ipcRenderer} = window.require('electron')
const ipc = window.ipc || {}

class HomeStart extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects : this.props.projects
    }
    ipc.messaging = {
        sendOpenCreateProject: function() {
            ipcRenderer.send('create-project', 'an-argument')
        }
    }
  }
  componentWillReceiveProps(nextProps){
    let _projects = [];
    for(let tmp in nextProps.projects){
        _projects[tmp] = JSON.parse(nextProps.projects[tmp]);
    }
    this.setState({projects: _projects})
  }
  render() {
    let projects = this.state.projects;
    console.log(projects)
    console.log(projects.length)

    return (
      <div className="home-start">
        <div className="home-section home-get-started">
          <Title contnet="Get Started" />
          <div className="home-body">
            <div className="home-app-new-wrapper">
              <div onClick={ ()=>ipc.messaging.sendOpenCreateProject()} className="home-app-new">
                <span className="haskon-newAppIcon"></span>
                <div className="t6">
                  New Project
                </div>                            
              </div>
            </div>
          </div>
        </div>
        <div className="home-section">
          <div className="home-title">
            <Title contnet="Recents" />
          </div>
          <div className="home-body">
            <div className="home-app-recent-wrapper">
              {
                (projects.length>0) && projects.map( (project,key) => {
                  return <HomeRecent icon={appIcon} data={project} destination={project.destination} name={project.name} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeStart;
