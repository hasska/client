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