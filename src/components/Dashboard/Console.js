  import React, { Component } from 'react';

import { Popover, Progress, Loading, Tabs, Select, Icon, Dropdown } from 'element-react';

import haskaType from "../../dist/img/haska.svg";
import run from "../../dist/img/run.svg";
import stop from "../../dist/img/stop.svg";
import clean from "../../dist/img/clean.svg";
import build from "../../dist/img/build.svg";
import publish from "../../dist/img/publish.svg";

import { Redirect } from 'react-router'

class Console extends Component {
  constructor(props){
    super(props)
    this.state = {
     
    }
  }
  render() {
    return (
    <div className="app-editor-wrapper">
      <div className="editor-actions">
        <a className="editor-clean"><img src={clean} /></a>
        <a><i className="el-icon-arrow-down"></i></a>
      </div>
      <Tabs activeName="2" onTabClick={ (tab) => console.log(tab.props.name) }>
        <Tabs.Pane label="User" name="1">User</Tabs.Pane>
        <Tabs.Pane label="Config" name="2">Config</Tabs.Pane>
      </Tabs>
    </div>
    );
  }
}

export default Console;