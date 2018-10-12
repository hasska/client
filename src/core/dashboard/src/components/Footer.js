/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';

import { Loading,Menu,SubMenu } from 'element-react';

require('element-theme-default');

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>{this.props.brand} Admin Dashboard, Powered by <a href="#">@Abject</a></p>   
      </div>

    );
  }
}

export default Footer;