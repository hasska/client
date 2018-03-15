import React, { Component } from 'react';

import { Tooltip, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../Title';

class DatabaseSingle extends Component {
	constructor(props) {
		super(props);
	}
  onChange(key, value) {
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }
	componentWillReceiveProps(nextProps){

  }
  render() {
		let currentDatabase = this.props.currentDatabase;
    return (
      <div className="app-preview">
			  <div className="database-single">
			    <div className="database-config-wrapper">
			      <Title contnet="Database config" />
						<div className="model-actions">
		          <Tooltip placement="top" content={ this.props.createMode == true ? 'Create'  : 'Apply Changes' }><Button type="text" onClick={ ()=>this.props.publishDb(this.props.currentDatabase) } size="small" className="publish-model">{ this.props.createMode == true ? <Icon name="check" />  : <Icon name="check" /> }</Button></Tooltip>
		          { !this.props.createMode && <Tooltip placement="top" content={"Delete"}><Button onClick={ ()=>this.props.removeDb(this.props.selectedDb) } type="text" size="small" className="remove-model"><i className="el-icon-delete2"></i></Button></Tooltip> }
		        </div>
			      <div className="database-config-form">
			        <Form className="en-US form-custom-style" labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
			          <Form.Item label="Name">
								{
									this.props.createMode == true ? <Input value={currentDatabase.name || ""} onChange={this.props.updateDatabase.bind(this, 'name')}></Input> :
									<Input value={currentDatabase.name || ""} disabled></Input>
								}

			          </Form.Item>
								<Form.Item label="DB Name">
			            <Input value={currentDatabase.database || ""} onChange={this.props.updateDatabase.bind(this, 'database')}></Input>
			          </Form.Item>
			          <div className="flex-2-1">
				          <Form.Item label="Host">
				            <Input value={currentDatabase.host || ""} onChange={this.props.updateDatabase.bind(this, 'host')}></Input>
				          </Form.Item>
				          <Form.Item label="Port">
				            <Input value={currentDatabase.port || ""} onChange={this.props.updateDatabase.bind(this, 'port')}></Input>
				          </Form.Item>
			          </div>
			          <Form.Item label="Username">
			            <Input value={currentDatabase.username || ""} onChange={this.props.updateDatabase.bind(this, 'username')}></Input>
			          </Form.Item>
			          <Form.Item label="Password">
			            <Input value={currentDatabase.password || ""} onChange={this.props.updateDatabase.bind(this, 'password')}></Input>
			          </Form.Item>
					      <div className="databases-select" label="Type">
						      <Radio.Group value={currentDatabase.connector} onChange={this.props.updateDatabase.bind(this, 'connector')}>
										<Radio.Button value="memory" label="Memomry" />
										<Radio.Button value="mongodb" label="Mongodb" />
						        <Radio.Button value="mysql" label="MySql" />
						        <Radio.Button value="postgresql" label="PostgreSql" />
						        <Radio.Button value="oracle" label="Oracel" />
						        <Radio.Button value="redis" label="Redis" />
						      </Radio.Group>
					      </div>

			        </Form>
			      </div>
			    </div>
			  </div>
      </div>
    );
  }
}

export default DatabaseSingle;
