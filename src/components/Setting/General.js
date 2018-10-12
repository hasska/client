/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import { Form, Input, Button, Switch, Upload, Message } from 'element-react';

const {ipcRenderer} = window.require('electron')
const ipc = window.ipc || {}

class General extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settingsGeneral:{
        description: '',
			}
		}

		ipc.messaging = {
	    sendOpenDialog: function() {
	        ipcRenderer.send('open-dialog-fav', 'an-argument')
	    }
	  }
	}


	componentWillMount(){
		const self = this;
		ipcRenderer.on('open-dialog-fav-reply', (event,arg) => {
			self.props.updateConfigs('FAV_ICON',arg[0]);
		});
	}

  onChange(key, value) {
    this.state.settingsGeneral[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
		console.log(this.props.configs)
		let imageUrl = this.props.configs.FAV_ICON || null;

    return (
      <div className="setting-form">
        <Form className="en-US form-custom-style" labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
          <Form.Item>
						<div onClick={ ()=> ipc.messaging.sendOpenDialog() } id="selectDirectory">
			      	<img onClick={ ()=>ipc.messaging.sendOpenDialog() } className="avatar" style={{'max-width':'150px'}} src={'file:///'+imageUrl} />
			      </div>
          </Form.Item>
          <Form.Item label="Brand">
            <Input value={this.props.configs.admin.PROJECT_BRAND || ""} onChange={this.props.updateConfigs.bind(this, 'PROJECT_BRAND')}></Input>
          </Form.Item>
          <Form.Item label="Authentication">
			      <Switch
			        value={this.props.configs.authentication}
							onChange={this.props.updateConfigs.bind(this, 'authentication')}
			        onText=""
			        offText="">
			        >
			      </Switch>
          </Form.Item>
          <Form.Item label="Description">
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 4}} value={this.state.settingsGeneral.descriptaion} onChange={this.onChange.bind(this, 'descriptaion')}></Input>
          </Form.Item>
        </Form>

      </div>
    );
  }

	handleAvatarScucess(res, file) {
	  this.setState({ imageUrl: URL.createObjectURL(file.raw) });
	}

	beforeAvatarUpload(file) {
	  const isJPG = file.type === 'image/jpeg';
	  const isLt2M = file.size / 1024 / 1024 < 2;

	  if (!isLt2M) {
	    Message('Avatar picture size can not exceed 2MB!');
	  }
	  return isJPG && isLt2M;
	}
}

export default General;
