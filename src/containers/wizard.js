import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Steps } from 'element-react';

import { Loading, Button } from 'element-react';
import ConfigureStep from '../components/ConfigureStep';
import ModelsStep from '../components/ModelsStep';

require('element-theme-default-custom');

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      buttonText: 'Next',
      back: 0,
    };
  }

  next() {
    let active = this.state.active + 1;
    this.setState({ active: active });
  }  
  componentWillMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    
  }
  saveConf(){
    this.setState({active: 1, buttonText: 'Create Project'})
  }
  firstStep(){
    this.setState({active: 0, buttonText: 'Next'})
  }
  render() {

    return (
        <div className="wizard-wrapper">
          <div className="wizard-steps-wrapper">
            <Steps className="wizard-steps" space={100} active={this.state.active} finishStatus="success">
              <Steps.Step title="Config"></Steps.Step>
              <Steps.Step title="Models"></Steps.Step>
            </Steps>
          </div>
          <div className="wizard-content-wrapper">
            <ConfigureStep active={this.state.active} />
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
