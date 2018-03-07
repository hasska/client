import React, { Component } from 'react';

import HomeRecent from './HomeRecent';
import Title from './../Title';

import newIcon from "../../dist/img/newAppIcon.svg";
import appIcon from "../../dist/img/appIcon.svg";

class HomeStart extends Component {
  render() {
    return (
      <div className="home-start">
        <div className="home-section home-get-started">
          <Title contnet="Get Started" />
          <div className="home-body">
            <div className="home-app-new-wrapper">
              <div className="home-app-new">
                <img src={newIcon} alt="New App" />
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
              <HomeRecent 
                icon={appIcon}
                name="Solo Do"
                destination="/Applications/Projects/solodo" />
              <HomeRecent 
                icon={appIcon}
                name="Solo Do"
                destination="/Applications/Projects/solodo" />
              <HomeRecent 
                icon={appIcon}
                name="Solo Do"
                destination="/Applications/Projects/solodo" />
              <HomeRecent 
                icon={appIcon}
                name="Solo Do"
                destination="/Applications/Projects/solodo" />
              <HomeRecent 
                icon={appIcon}
                name="Solo Do"
                destination="/Applications/Projects/solodo" />
              <HomeRecent 
                icon={appIcon}
                name="Solo Do"
                destination="/Applications/Projects/solodo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeStart;
