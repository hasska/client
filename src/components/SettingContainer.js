import React, { Component } from 'react';
import {Tabs} from 'element-react';

class SettingContainer extends Component {
  render() {
    return (
      <div className="app-window">
	      <div className="setting-wrapper">
			    <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
			      <Tabs.Pane label="General" name="1">
			      	
			      </Tabs.Pane>
			      <Tabs.Pane label="Environments" name="2">
			      </Tabs.Pane>
			      <Tabs.Pane label="Admin Dashboard" name="3">
			      </Tabs.Pane>
			      <Tabs.Pane label="Account" name="4">
			      </Tabs.Pane>
			      <Tabs.Pane label="Dependencies" name="5">
			      </Tabs.Pane>
			    </Tabs>      
	      </div>
      </div>
    );
  }
}

export default SettingContainer;
