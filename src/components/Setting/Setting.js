import React, { Component } from 'react';
import {Tabs} from 'element-react';

import General from './General';
import Environments from './Environments';
import AdminDashboard from './AdminDashboard';
import Account from './Account';
import Dependencies from './Dependencies';

class Setting extends Component {
  render() {
    return (
      <div className="app-window">
	      <div className="setting-wrapper">
			    <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
			      <Tabs.Pane label="General" name="1">
				      <General />
			      </Tabs.Pane>
			      <Tabs.Pane label="Environments" name="2">
				      <Environments />
			      </Tabs.Pane>
			      <Tabs.Pane label="Admin Dashboard" name="3">
				      <AdminDashboard />
			      </Tabs.Pane>
			      <Tabs.Pane label="Account" name="4">
				      <Account />
			      </Tabs.Pane>
			      <Tabs.Pane label="Dependencies" name="5">
				      <Dependencies />
			      </Tabs.Pane>
			    </Tabs>      
	      </div>
      </div>
    );
  }
}

export default Setting;
