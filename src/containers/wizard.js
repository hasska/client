import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Loading } from 'element-react';
import ConfigureStep from './components/ConfigureStep';
import ModelsStep from './components/ModelsStep';

require('element-theme-default');

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }
  componentWillMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    return (
        <div>
          Wizard
          {
            ( this.state.step == 1 ) ? <ConfigureStep /> : <ModelsStep />
          }
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
