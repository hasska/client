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
			        value={this.state.settingsAdminDashboard.active}
			        onChange={this.onChange.bind(this, 'active')}
			        onText=""
			        offText="">
			        >
			      </Switch>
          </Form.Item>
          <Form.Item label="Usrename">
            <Input value={this.state.settingsAdminDashboard.username} onChange={this.onChange.bind(this, 'username')}></Input>
          </Form.Item>
          <Form.Item label="Password">
            <Input value={this.state.settingsAdminDashboard.password} onChange={this.onChange.bind(this, 'password')}></Input>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AdminDashboard;
