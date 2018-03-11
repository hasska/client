import React, { Component } from 'react';

import { Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../Title';

class DatabaseSingle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dbInfo:{
        name: '',
        host: '',
        username: '',				
        password: '',				
        type: '',				
			}
		}
	}
  onChange(key, value) {
    this.state.dbInfo[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="app-preview">
			  <div className="database-single">
			    <div className="database-config-wrapper">
			      <Title contnet="Database config" />
			      <div className="database-config-form">
			        <Form className="en-US form-custom-style" model={this.state.dbInfo} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
			          <Form.Item label="Name">
			            <Input value={this.state.dbInfo.name} onChange={this.onChange.bind(this, 'name')}></Input>
			          </Form.Item>
			          <div className="flex-2-1">
				          <Form.Item label="Host">
				            <Input value={this.state.dbInfo.host} onChange={this.onChange.bind(this, 'host')}></Input>
				          </Form.Item>
				          <Form.Item label="Port">
				            <Input value={this.state.dbInfo.port} onChange={this.onChange.bind(this, 'port')}></Input>
				          </Form.Item>
			          </div>
			          <Form.Item label="Username">
			            <Input value={this.state.dbInfo.name} onChange={this.onChange.bind(this, 'name')}></Input>
			          </Form.Item>
			          <Form.Item label="Password">
			            <Input value={this.state.dbInfo.name} onChange={this.onChange.bind(this, 'name')}></Input>
			          </Form.Item>
					      <Form.Item label="Type" className="radio-full-4">
						      <Radio.Group value={this.state.dbInfo.type} onChange={this.onChange.bind(this, 'type')}>
						        <Radio.Button value="Mongo" />
						        <Radio.Button value="My sql" />
						        <Radio.Button value="Oracle" />
						        <Radio.Button value="Couch" />
						        <Radio.Button value="Elastic" />
						      </Radio.Group>      
					      </Form.Item>

			        </Form>
			      </div>
			    </div>
			  </div>
      </div>
    );
  }
}

export default DatabaseSingle;
