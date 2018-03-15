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

	componentWillReceiveProps(nextProps){
		console.log(nextProps)
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
			        <Radio.Button value="Development" />
			        <Radio.Button disabled value="Production" />
			        <Radio.Button disabled value="Test" />
			      </Radio.Group>
		      </Form.Item>
          <div className="flex-2-1">
	          <Form.Item label="API Host">
	            <Input value={this.props.configs.SERVICE_HOST || "127.0.0.1"} onChange={this.props.updateConfigs.bind(this, 'SERVICE_HOST')}></Input>
	          </Form.Item>
	          <Form.Item label="API Port">
	            <Input value={this.props.configs.SERVICE_PORT || "8080"} onChange={this.props.updateConfigs.bind(this, 'SERVICE_PORT')}></Input>
	          </Form.Item>
          </div>
          <div className="flex-2-1">
	          <Form.Item label="Admin Host">
	            <Input value={this.props.configs.admin.HOST || "127.0.0.1"} onChange={this.props.updateConfigs.bind(this, 'HOST')}></Input>
	          </Form.Item>
	          <Form.Item label="Admin Port">
	            <Input value={this.props.configs.admin.PORT || "3006"} onChange={this.props.updateConfigs.bind(this, 'PORT')}></Input>
	          </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}

export default Environments;
