import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import CodeIcon from 'react-icons/lib/go/file-code';
import ImgIcon from 'react-icons/lib/go/file-media';
import ArowBot from 'react-icons/lib/go/triangle-down';
import ArowRight from 'react-icons/lib/go/triangle-right';
import PlainIcon from 'react-icons/lib/go/file-text';
import FolderIcon from 'react-icons/lib/go/file-directory';
import RepoIcon from 'react-icons/lib/go/repo'

import Tabs from '../containers/Tabs';

class FilesTree extends Component {
  constructor(props){
   super(props)
   this.state = {
    file: this.props.file
   }
  }

  openFolder(){
    let tmp = this.state.file;
    tmp['open'] = true;
    this.setState({file: tmp})
  }

  closeFolder(){
    let tmp = this.state.file;
    tmp['open'] = false;
    this.setState({file: tmp})
  }

  render() {
    let menus = [], top_menu = [];
    let files = [], type = this.state.file.type, name = this.state.file.name;
    let format = name.split('.')[1];

    console.log(this.state.file)
    if(type=='directory'){
      if(!this.state.file.open){
        files.push(<a onClick={ () =>this.openFolder()} className="nav-group-item"><ArowRight /> <FolderIcon />{ this.state.file.name }</a>);
      }
      else{
        files.push(<a onClick={ () =>this.closeFolder()} className="nav-group-item"><ArowBot /> <FolderIcon />{ this.state.file.name }</a>);
        files.push(<div className={(this.state.file.open ? '' : 'hide')+" childrens-dir"}>{this.props.childrens}</div>)
      }
    }
    else{
        files.push(<span onClick={ () => this.props.loadFile(this.state.file.path,this.state.file.name) } className="nav-group-item"><CodeIcon /> { this.state.file.name}</span>);
    }

    return (
      <div>
        {
          files
        }
      </div>
    );
  }
}

export default FilesTree;