import React, { Component } from 'react';

import { Form, Input, Radio, Button, Switch, Upload, Message } from 'element-react';


class Dependencies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settingsAccount:{
        username: 'fredrico',
        email: 'bkop@fred.io',
			}
		}
	}

  onChange(key, value) {
    this.state.settingsAccount[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="setting-form">
        <Form className="en-US form-custom-style" model={this.state.settingsAccount} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
          <Form.Item label="Usrename">
            <Input value={this.state.settingsAccount.username} onChange={this.onChange.bind(this, 'username')}></Input>
          </Form.Item>
          <Form.Item label="email">
            <Input value={this.state.settingsAccount.email} onChange={this.onChange.bind(this, 'email')}></Input>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Dependencies;
