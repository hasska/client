import React, { Component } from 'react';

import { Form, Input, Radio, Button, Switch, Upload, Message } from 'element-react';


class Environments extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settingsEnvironments:{
        type: 'Debug',
        apiHost: '',
        apiPort: '',
        adminHost: '',
        adminPort: '',
			}
		}
	}

  onChange(key, value) {
    this.state.settingsEnvironments[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="setting-form">
        <Form className="en-US form-custom-style" model={this.state.settingsEnvironments} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
		      <Form.Item label="Type" className="radio-full-3">
			      <Radio.Group value={this.state.settingsEnvironments.type} onChange={this.onChange.bind(this, 'type')}>
			        <Radio.Button value="Debug" />
			        <Radio.Button value="Production" />
			        <Radio.Button value="Test" />
			      </Radio.Group>      
		      </Form.Item>
          <div className="flex-2-1">
	          <Form.Item label="API Host">
	            <Input value={this.state.settingsEnvironments.apiHost} onChange={this.onChange.bind(this, 'apiHost')}></Input>
	          </Form.Item>
	          <Form.Item label="API Port">
	            <Input value={this.state.settingsEnvironments.apiPort} onChange={this.onChange.bind(this, 'apiPort')}></Input>
	          </Form.Item>
          </div>
          <div className="flex-2-1">
	          <Form.Item label="Admin Host">
	            <Input value={this.state.settingsEnvironments.adminHost} onChange={this.onChange.bind(this, 'adminHost')}></Input>
	          </Form.Item>
	          <Form.Item label="Admin Port">
	            <Input value={this.state.settingsEnvironments.adminPort} onChange={this.onChange.bind(this, 'adminPort')}></Input>
	          </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

export default Environments;
