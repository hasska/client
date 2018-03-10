import React, { Component } from 'react';

import { Form, Input, Checkbox, Radio, Button } from 'element-react';

import folder from "../dist/img/folder.svg";
import mongoIcon from "../dist/img/db/mongo.jpg";

import mdDefault from "../dist/img/mdDefault.svg";
import mdBlog from "../dist/img/mdBlog.svg";
import mdShop from "../dist/img/mdShop.svg";
import mdCompany from "../dist/img/mdCompany.svg";
const {ipcRenderer} = window.require('electron')


const ipc = window.ipc || {}
require('element-theme-default-custom');

class ConfigureStep extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	step: 1,
	    form: this.props.form
	  };

	  ipc.messaging = {
	    sendOpenDialog: function() {
	        ipcRenderer.send('open-dialog', 'an-argument')
	    }
	  }
	}

	onChange(key, value) {
	  let _form = this.state.form;
	  _form[key] = value;
	  this.setState({form: _form});
	}

	onSubmit(e) {
	  e.preventDefault();
	}

	componentDidMount() {
	 const self = this;
	 ipcRenderer.on('open-dialog-reply', (event, arg) => {
	 	let _form = self.state.form;
	 	if(typeof arg != "undefined" && arg[0])
	 	_form['destination'] = arg[0];
	    self.setState({ form: _form});
	  })
	}

	showDialog(){
		ipc.messaging.sendOpenDialog();
	}

	render() {
	  return (
	  	<div>
	  	{
	  		this.props.active ==0 ?
	    <Form className="en-US form-custom-style wizard-config-form" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
	      <Form.Item label="Name">
	        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
	      </Form.Item>
	      <Form.Item label="Destination">
		      <div onClick={ ()=> this.showDialog() } id="selectDirectory" className="select-directory">
		      	<div className="project-path no-select">{this.state.form['destination'] || 'Choose Folder' }</div>
		      	<img src={folder} />
		      </div>
	      </Form.Item>
	      <div className="space-30"></div>
	      
	      <Form.Item className="wizard-action">
	      </Form.Item>
	    </Form> :
	    <div className="modelsStep">
	    	<div className="wizard-models-option-wrapper">
		    	<div className="models-option-row">
			    	<div className="models-option active">
			    		<img src={mdDefault}></img>
			    		<div className="t5">Default</div>
			    	</div>
			    	<div className="models-option">
			    		<img src={mdBlog}></img>
			    		<div className="t5">Built-in Blog</div>
			    	</div>
		    	</div>
		    	<div className="models-option-row">
			    	<div className="models-option">
			    		<img src={mdShop}></img>
			    		<div className="t5">Built-in eCommerce</div>
			    	</div>
			    	<div className="models-option">
			    		<img src={mdCompany}></img>
			    		<div className="t5">Built-in Company</div>
			    	</div>
		    	</div>
	    	</div>

	    </div>
	  }
	  </div>
	  )
	}

}

export default ConfigureStep;
