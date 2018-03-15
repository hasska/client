import React, { Component } from 'react';

import { Form, Input, Radio, Button, Switch, Upload, Message } from 'element-react';
import cactus from '../../dist/img/cactus.png';

class Account extends Component {

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
      <div className="setting-form account-form">
				<img style={{width:'200px',display:'block',margin:'0 auto'}} src={cactus} />
				<br />
        <p>This is a beta version of haska for test. Thank you for testing our application. <br /><br /><b>Feel free to send us your feedbacks ;)</b></p>
      </div>
    );
  }
}

export default Account;
