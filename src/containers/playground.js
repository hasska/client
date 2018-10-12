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

require('element-theme-default');

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }
  render() {
    return (
        <div>
          Playground
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
export default withRouter(connect(mapStateToProps)(Playground));
