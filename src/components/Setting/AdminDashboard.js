import React, { Component } from 'react';

import { Form, Input, Radio, Button, Switch, Upload, Message } from 'element-react';


class AdminDashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settingsAdminDashboard:{
        active: 'true',
        username: '',
        password: '',
			}
		}
	}

  onChange(key, value) {
    this.state.settingsAdminDashboard[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="setting-form">
        <Form className="en-US form-custom-style" model={this.state.settingsAdminDashboard} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
          <Form.Item label="AdminDashboard">
			      <Switch
			        value={this.props.configs.admin.DISABLE_ADMIN}
			        onChange={this.props.updateConfigs.bind(this, 'DISABLE_ADMIN')}
			        onText=""
			        offText="">
			        >
			      </Switch>
          </Form.Item>
          <Form.Item label="Usrename">
            <Input value={this.props.configs.admin.default_username} onChange={this.props.updateConfigs.bind(this, 'default_username')}></Input>
          </Form.Item>
          <Form.Item label="Password">
            <Input value={this.props.configs.admin.default_password} onChange={this.props.updateConfigs.bind(this, 'default_password')}></Input>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AdminDashboard;
