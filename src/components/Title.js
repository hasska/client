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
