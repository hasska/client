/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Steps } from 'element-react';
import { Loading, Button, Message } from 'element-react';
import ConfigureStep from '../components/ConfigureStep';
import ModelsStep from '../components/ModelsStep';

const {ipcRenderer} = window.require('electron');
const ipc = window.ipc || {};

require('element-theme-default');

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      buttonText: 'Next',
      back: 0,
      loading: false,
      fullscreen: false,
      form: {
        name: '',
        destination: '',
        dbInit: 'default',
        modelDefault: 'default'
      }
    };

    ipc.messaging = {
      sendCreateProject: function(data) {
          ipcRenderer.send('main-project', data)
      },
      CreateProject: function(data) {
          ipcRenderer.send('create-project-ipc', data)
      }
    }
  }
  next() {
    let active = this.state.active + 1;
    this.setState({ active: active });
  }
  componentDidMount(){
    const self = this;
    ipcRenderer.on('models-create-ipc-result', (event, arg) => {
      self.setState({ loading: false, fullscreen: false });
      if(arg.status=='success'){
        self.showMessage('Project Created Successfully :)','success');
        ipc.messaging.sendCreateProject(arg.data);
      } else {
        self.showMessage(arg.msg,'error');
      }
    });
  }
  validation(callback){
    let validate = true, msg = '';
    if(this.state.form.name == ''){
      validate = false;
      msg = 'Project name field required';
    }

    if(this.state.form.destination == ''){
      validate = false;
      msg = 'Project destination folder required';
    }
    callback(validate,msg);
  }
  showMessage(msg,type){
     Message({
      message: msg,
      type: type,
      showClose: false,
    });
  }
  saveConf(){
    const self = this;
    if(this.state.active == 0){
      this.validation((validate,msg)=> {
        if(validate)
          self.setState({active: 1, buttonText: 'Create Project'})
        else
          self.showMessage(msg,'error')
      })
    }
    else{
      this.setState({ loading: true, fullscreen: true });
      ipc.messaging.CreateProject(this.state.form)
    }
  }
  firstStep(){
    this.setState({active: 0, buttonText: 'Next'})
  }
  render() {
    return (
        <div className="wizard-wrapper">
          <Loading loading={this.state.loading} fullscreen={this.state.fullscreen} text={'Creating Project'} />
          <div className="wizard-steps-wrapper">
            <Steps className="wizard-steps" space={100} active={this.state.active} finishStatus="success">
              <Steps.Step title="Config"></Steps.Step>
              <Steps.Step title="Models"></Steps.Step>
            </Steps>
          </div>
          <div className="wizard-content-wrapper">
            <ConfigureStep form={this.state.form} active={this.state.active} />
          </div>
          <div className="wizard-action-wrapper">
            <Button onClick={this.firstStep.bind(this)} className="app-button back-button" >Back</Button>
            <Button onClick={this.saveConf.bind(this)} className="app-button" nativeType="submit">{this.state.buttonText}</Button>
          </div>
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
export default withRouter(connect(mapStateToProps)(Wizard));
