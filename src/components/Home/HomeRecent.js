import React, { Component } from 'react';

class HomeRecent extends Component {
  render() {
    return (
      <div className="home-app-recent">
        <div className="app-recent-logo">
          <img src={this.props.icon} alt="rootvision" />
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
