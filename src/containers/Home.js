import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Loading } from 'element-react';

require('element-theme-default');

class Home extends Component {
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
        <div>
          Home
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
export default withRouter(connect(mapStateToProps)(Home));
