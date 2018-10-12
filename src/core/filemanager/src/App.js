/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";
import { configs } from './configs';

import FilesTree from './containers/FilesTree'
import Tabs from './containers/Tabs'
import Editor from './containers/Editor'

import axios from 'axios';

const PROJECT_PATH = configs.PROJECT_PATH;
const PROJECT_BRAND = configs.PROJECT_BRAND;

export default class MainApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      configs: configs,
      loading: false,
      fullscreen: false,
      files: [],
      tabs: [],
      open_file:[],
      content: "",
      pinned: false
    }
    this.loadFile = this.loadFile.bind(this);
    this.switchTab = this.switchTab.bind(this);
  }

  loadFile(path,name) {
    console.log(this.state.open_file)
    console.log(path)
    if(path != this.state.open_file.path){
      let tmp = this.state.tabs;
      let found = false;
      const self = this;
      this.setState({open_file: []})
      for(var tab in tmp){
        tmp[tab]['active'] = '';
        if(tmp[tab].path==path){
          console.log('found')
          found = true;
        }
      }

      if(found){
        this.switchTab(path,name);
      } else {
        if( (name!='package.json') || (name=='package.json' && this.state.pinned==false) ){

          axios.post('http://'+configs.CORE_HOST+':'+configs.CORE_PORT+'/read/file',{
            path: path
          }).then( (body)=> {
        
            let new_tab = {
              path: path,
              name: name,
              active: 'active'
            };

            tmp.push(new_tab)

            self.setState({pinned:true,content:body.data.data, tabs: tmp,open_file: new_tab });
          }).catch( (err)=> {

          });
          
        }
      }
    }
  }

  switchTab(path,name){
    if(path != this.state.open_tab.path){
      let tmp = this.state.tabs;
      let open_tab = null;
      const self = this;

      for(var tab in tmp){
        tmp[tab]['active'] = '';
        if(tmp[tab].path == path){
          open_tab = tmp[tab];
          tmp[tab]['active'] = 'active';
        }
      }

        self.setState({tabs: tmp,open_file: open_tab });

      axios.post('http://'+configs.CORE_HOST+':'+configs.CORE_PORT+'/read/file',{
        path: path
      }).then( (body)=> {
    
        let new_tab = {
          path: path,
          name: name,
          active: 'active'
        };

        //tmp.push(new_tab)

        self.setState({content:body.data.data });
      }).catch( (err)=> {

      });
    }

  }

  componentWillMount(){
    const self = this;

    axios.post('http://'+configs.CORE_HOST+':'+configs.CORE_PORT+'/read/directory',{
      path: configs.PROJECT_PATH
    },{
      timeout:3000
    }).then( (body) => {
      let tmp = body.data.data.children;
      let new_tabs = self.state.tabs;

      for(let file in tmp){
        if(tmp[file]==null)
          delete tmp[file];
      }

      self.loadFile(configs.PROJECT_PATH+'package.json', 'package.json');
      
      let new_tab = {
        path: configs.PROJECT_PATH+'package.json',
        name: 'package.json',
        active: 'active'
      };

      //new_tabs.push(new_tab);

      self.setState({ open_file: new_tab, tabs: new_tabs, files: body.data.data.children });
    })
    .then ( (response) => {
      console.log(response)
    })
    .catch( (response) => {
      //console.log(err)
    })
  }

  render() {

    return (
      <Router>
        <div>
          { this.state.files.length != 0 ? <div className="pane-group"><FilesTree loadFile={this.loadFile} files={this.state.files} configs={configs} />
          <div className="pane main-layout">
            <Tabs switchTab={this.switchTab} loadFile={this.loadFile} tabs={this.state.tabs} configs={configs} />
            <div className="content-file" tabs={this.state.tabs}>
              { (this.state.open_file.length != 0 && this.state.content != "") ? <Editor content={this.state.content} configs={configs} file={this.state.open_file} /> : null }
            </div>
          </div>
          <div className="console">

          </div></div> : null }
        </div>
      </Router>
    )
  }
}
