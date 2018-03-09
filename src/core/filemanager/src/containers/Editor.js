import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import CodeIcon from 'react-icons/lib/go/file-code';
import PlainIcon from 'react-icons/lib/go/file-text';
import FolderIcon from 'react-icons/lib/go/file-directory';
import CogsIcon from 'react-icons/lib/go/gear';
import GoRepoCloneIcon from 'react-icons/lib/go/repo-clone';
import EclIcon from 'react-icons/lib/go/ellipsis'
import CloseIcon from 'react-icons/lib/go/x'
import axios from 'axios';

require('codemirror/lib/codemirror.css');

var CodeMirror = require('react-codemirror');


class Tabs extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: this.props.content
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('#############')
  }

  shouldComponentUpdate(nextProps) {
      return true;
  }

  componentWillMount(){

  }

  updateCode(newCode) {
    this.setState({
      content: newCode,
    });
  }

  render() {
   
    const self = this;
    
    let name = this.props.file.name;
    let format = this.props.file.name.split('.')[1];
    let options = {
      lineNumbers: true,
      mode: "json",
      theme: "material"
    };

    return (
      <div className="content-wrapper">
        {
          this.state.content != "" ? <CodeMirror value={this.state.content} onChange={this.updateCode} options={options} />: null
        }
      </div>
    );
  }
}

export default Tabs;