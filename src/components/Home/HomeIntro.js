import React, { Component } from 'react';

import IntroTips from './IntroTips';


import logo from "../../dist/img/logo.svg";
import logoType from "../../dist/img/logoType.svg";
import tutorialIcon from "../../dist/img/introTutorial.svg";
import comunityIcon from "../../dist/img/introComunity.svg";
import closeIcon from "../../dist/img/closeIcon.svg";



const remote = window.require('electron').remote;

class HomeIntro extends Component {

  componentDidMount(){
    document.getElementById("introAppClose").addEventListener("click", function (e) {
         var window = remote.getCurrentWindow();
         window.close();
    });    
  }
  render() {
    return (
      <div className="home-intro">
        <div className="intro-top">
          <a id="introAppClose" className="intro-app-close">
            <img src={closeIcon} alt="rootvision" />
          </a>
          <div className="intro-app-logo">
            <img src={logo} alt="rootvision" />
          </div>
          <div className="intro-app-welcome">
            <div className="t5">Welcome to</div>
            <img src={logoType} alt="rootvision" />
          </div>
          <div className="intro-app-version">
            <div className="t6">version 1.0.0</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeIntro;
