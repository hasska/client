import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import CodeIcon from 'react-icons/lib/go/file-code';
import PlainIcon from 'react-icons/lib/go/file-text';
import FolderIcon from 'react-icons/lib/go/file-directory';
import CogsIcon from 'react-icons/lib/go/gear';
import GoRepoCloneIcon from 'react-icons/lib/go/repo-clone';
import EclIcon from 'react-icons/lib/go/ellipsis'
import CloseIcon from 'react-icons/lib/go/x'

class Tabs extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  shouldComponentUpdate(nextProps) {
      return true;
  }

  render() {
    let menus = [], top_menu = [];
    const self = this;
 
    return (
      <div className="tab-group">
        {
          this.props.tabs.map( (tab) => {
            return (<div onClick={ () => this.props.switchTab(tab.path,tab.name)} className={"tab-item "+tab.active}>
                    <CloseIcon />
                    <span>{ tab.name }</span>
                  </div>) 
          })
        }
        
      </div>
    );
  }
}

export default Tabs;