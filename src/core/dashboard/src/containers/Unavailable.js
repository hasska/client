import React, { Component } from 'react';

import { Loading } from 'element-react';

require('element-theme-default');

class Unavailable extends Component {
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
          Dashboard Project
        </div>
    );
  }
}

export default Unavailable;