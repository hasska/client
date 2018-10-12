/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import React, { Component } from 'react';

class LoggerPane extends Component {
  constructor(props){
  	super(props)
  	this.state = {
  		history: this.props.history
  	}
  }
  componentDidMount(){
  	this.setState({history: [{value: ''}]})
  }
  render() {
    return (
	    <div className="terminal">                        
	      
	    </div>
    );
  }
}

export default LoggerPane;
