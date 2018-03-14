import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Popover, Progress, Dialog, Loading, Tabs, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../components/Title';
import clean from "../dist/img/clean.svg";

import LoggerPane from '../components/LoggerPane'
import Nav from '../components/Dashboard/Nav'
import ActionBar from '../components/Dashboard/ActionBar'
import Console from '../components/Dashboard/Console'
import { BrowserRouter, Route } from 'react-router-dom';

import axios from 'axios';

require('element-theme-default');

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  render() {

    return (
      <div className="app-top">

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
//export default withRouter(connect(mapStateToProps)(Overview));
export default Overview;
