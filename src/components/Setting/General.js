import React, { Component } from 'react';

import { Form, Input, Button, Switch, Upload, Message } from 'element-react';

class General extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settingsGeneral:{
        imageUrl: '',
        brand: '',
        authentication: 'true',
        description: '',				
			}
		}
	}

  onChange(key, value) {
    this.state.settingsGeneral[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
	  const { imageUrl } = this.state.settingsGeneral;
    return (
      <div className="setting-form">
        <Form className="en-US form-custom-style" model={this.state.settingsGeneral} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
          <Form.Item>
				    <Upload
				      className="logo-uploader"
				      action="//jsonplaceholder.typicode.com/posts/"
				      showFileList={false}
				      onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
				      beforeUpload={file => this.beforeAvatarUpload(file)}
				    >
				      { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-picture avatar-uploader-icon"></i> }
				    </Upload>
          </Form.Item>
          <Form.Item label="Brand">
            <Input value={this.state.settingsGeneral.brand} onChange={this.onChange.bind(this, 'brand')}></Input>
          </Form.Item>
          <Form.Item label="Authentication">   
			      <Switch
			        value={this.state.settingsGeneral.authentication}
			        onChange={this.onChange.bind(this, 'authentication')}
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

	  if (!isJPG) {
	    Message('Avatar picture must be JPG format!');
	  }
	  if (!isLt2M) {
	    Message('Avatar picture size can not exceed 2MB!');
	  }
	  return isJPG && isLt2M;
	}
}

export default General;
