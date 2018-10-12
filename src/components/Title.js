/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
 
import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
	    <div className="head-title">                        
	      <div className="t6">
	        {this.props.contnet}
	      </div>
	    </div>
    );
  }
}

export default Title;
