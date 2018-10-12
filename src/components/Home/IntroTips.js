/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';

class IntroTips extends Component {
  render() {
    return (
      <div className="intro-tips">
        <div className="intro-tips-icon">
          <img src={this.props.icon} alt="Tutorials" />
        </div>
        <div className="intro-tips-info">
          <div className="t5">{this.props.title}</div>
          <div className="t6">{this.props.desc}</div>
        </div>
      </div>
    );
  }
}

export default IntroTips;
