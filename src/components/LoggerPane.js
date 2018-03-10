import React, { Component } from 'react';

class LoggerPane extends Component {
  constructor(props){
  	super(props)
  	this.state = {
  		history: this.props.history
  	}
  }
  componentDidMount(){
  	this.setState({history: [{value: 'sag'}]})
  }
  render() {
    return (
	    <div className="terminal">                        
	      
	    </div>
    );
  }
}

export default LoggerPane;
