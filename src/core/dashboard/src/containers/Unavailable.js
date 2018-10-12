/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
  render() {
    return (
        <div>
          Dashboard Project
        </div>
    );
  }
}

export default Unavailable;