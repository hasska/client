import React, { Component } from 'react';

import { Form, Input, Checkbox, Radio, Button } from 'element-react';

import folder from "../dist/img/folder.svg";

import mdDefault from "../dist/img/mdDefault.svg";
import mdBlog from "../dist/img/mdBlog.svg";
import mdShop from "../dist/img/mdShop.svg";
import mdCompany from "../dist/img/mdCompany.svg";

require('element-theme-default');


class ConfigureStep extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	step: 1,
	    form: {
	      name: '',
	      destination: '',
	      dbInit: 'default',
	      dbType: 'mongo',
	      dbUsername: '',
	      dbPassword: '',
	      dbName: '',
	      dbHost: 'localhost',
	    }
	  };
	}

	onChange(key, value) {
	  this.state.form[key] = value;
	  this.forceUpdate();
	}

	onSubmit(e) {
	  e.preventDefault();
	}

  componentWillMount() {
  }
  componentDidMount() {
  }

  componentWillReceiveProps(){
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
	      <div id="selectDirectory" className="select-directory">
	      	<div className="project-path no-select">Choose Folder</div>
	      	<img src={folder} />
	      </div>
      </Form.Item>
      <div className="space-30"></div>
      <Form.Item label="Database" className="radio-full-2">
	      <Radio.Group value={this.state.form.dbInit} onChange={this.onChange.bind(this, 'dbInit')}>
	        <Radio.Button value="Default" />
	        <Radio.Button value="Custom" />
	      </Radio.Group>      
      </Form.Item>
      <div className="custom-db-container display-block" id="customDbContainer">
	      <Form.Item label="DB Type" className="radio-full-4">
		      <Radio.Group value={this.state.form.dbType} onChange={this.onChange.bind(this, 'dbType')}>
		        <Radio.Button value="Mongo" />
		        <Radio.Button value="My sql" />
		        <Radio.Button value="Oracle" />
		        <Radio.Button value="Couch" />
		        <Radio.Button value="Elastic" />
		      </Radio.Group>      
	      </Form.Item>
	      <Form.Item label="DB Username">
	        <Input value={this.state.form.dbUsername} onChange={this.onChange.bind(this, 'dbUsername')}></Input>
	      </Form.Item>
	      <Form.Item label="DB Password">
	        <Input type="password" value={this.state.form.dbPassword} onChange={this.onChange.bind(this, 'dbPassword')}></Input>
	      </Form.Item>
	      <Form.Item label="DB Name">
	        <Input value={this.state.form.dbName} onChange={this.onChange.bind(this, 'dbName')}></Input>
	      </Form.Item>
	      <Form.Item label="DB Host">
	        <Input value={this.state.form.dbHost} onChange={this.onChange.bind(this, 'dbHost')}></Input>
	      </Form.Item>
	    </div>
      <Form.Item className="wizard-action">
      </Form.Item>
    </Form> :
    <div className="modelsStep">
    	<div className="wizard-models-option-wrapper">
	    	<div className="models-option-row">
		    	<div className="models-option">
		    		<img src={mdDefault}></img>
		    		<div className="t5">Default</div>
		    	</div>
		    	<div className="models-option">
		    		<img src={mdBlog}></img>
		    		<div className="t5">Blog</div>
		    	</div>
	    	</div>
	    	<div className="models-option-row">
		    	<div className="models-option">
		    		<img src={mdShop}></img>
		    		<div className="t5">eCommerce</div>
		    	</div>
		    	<div className="models-option">
		    		<img src={mdCompany}></img>
		    		<div className="t5">Company</div>
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
