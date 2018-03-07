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
