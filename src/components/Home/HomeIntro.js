/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import IntroTips from './IntroTips';
import logo from "../../dist/img/logo/haska-white.svg";
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
            <span className="haskon-close"></span>
          </a>
          <div className="intro-app-logo">
            <img src={logo} width="185" alt="rootvision" />
          </div>

          <div className="intro-app-version">
            <div className="t6"><span>Beta Version</span><br />Copyright @Haska.io 2018</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeIntro;
