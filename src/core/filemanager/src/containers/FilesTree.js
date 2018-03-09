import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import CodeIcon from 'react-icons/lib/go/file-code';
import PlainIcon from 'react-icons/lib/go/file-text';
import FolderIcon from 'react-icons/lib/go/file-directory';
import CogsIcon from 'react-icons/lib/go/gear';
import GoRepoCloneIcon from 'react-icons/lib/go/repo-clone';
import RepoIcon from 'react-icons/lib/go/repo'
import PackIcon from 'react-icons/lib/go/package'

import File from '../components/File';

class FilesTree extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){

  }

  showMessage(title,msg,type) {
    Notification({
      title: title,
      message: msg,
      type: type
    });
  }

  render() {
    let menus = [], top_menu = [];
    const self = this;
 
    return (
      <div className="files-tree">
        <div className="pane sidebar">
          <nav className="nav-group">
            <h5 className="nav-group-title"><RepoIcon size={15} /> { this.props.configs.PROJECT_BRAND } FOLDERS</h5>
            {
              this.props.files.map( (el) => {
                let format = el.name.split('.')[1];
                if(format=='png' || format=='jpg' || format=='jpeg' || format=='gif' || format=='ico'){

                } else {

                  if(!el.children)
                    return <File  loadFile={this.props.loadFile} file={el} />
                  else{
                    let filesChildren = el.children;
                    let childrens = [];
                    filesChildren.map( (child) => {
                      if(child != null)
                        childrens.push(<File  loadFile={this.props.loadFile} parent={child.parent} file={child} />)
                    });
                    return <File  loadFile={this.props.loadFile} childrens={childrens} file={el} />
                  }
                }
              })
            }
            <div className="bottom-sidebar">
              <button className="btn-desktop"><PackIcon /> Package Manager</button>
              <button className="btn-desktop"><CogsIcon size={15} /></button>
              <button className="btn-desktop"><GoRepoCloneIcon size={15} /></button>
            </div>
          </nav> 
        </div>
      </div>
    );
  }
}

export default FilesTree;