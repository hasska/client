import React, { Component } from 'react';

import { Tooltip, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../components/Title';
import dockerImg from '../dist/img/deploy/docker.jpg';
import awsImg from '../dist/img/deploy/aws.png';
import jenkinsImg from '../dist/img/deploy/jenkins.png';
import travisImg from '../dist/img/deploy/travis.png';
import herokuImg from '../dist/img/deploy/heroku.png';



class DeployManager extends Component {
  render() {
    return (
      <div className="app-window">
        <div className="app-preview">
          <div className="database-single">
            <div className="database-config-wrapper">
              <Title contnet="Manual Deployment" />
              <div className="database-config-form">
                <p className="ins-dep">
                  <code className="projectPath">{ this.props.project.destination }</code>
                  <b>*</b> Please navigate to your project folder and remove <small>node_modules</small> and then the directory will be ready for deplpoyment by git or any deployment methodes.
                  For build and running the project in your server follow the instructions.
                </p>
                <div className="ins-codes">
                  <p>Install packages in root and dashboard directories :</p>
                  <code className="commands">npm install</code>
                  <p>Running API services :</p>
                  <code className="commands">node .</code>
                  <p>Running admin dashboard :</p>
                  <code className="commands">npm start</code>
                </div>
              </div>
            </div>
            <div className="database-config-wrapper">
              <Title contnet="Authomatic Deployment" />
              <div className="database-config-form deploy-method">
                <ul>
                  <li><img style={{"height":"70px"}} src={ dockerImg } /></li>
                  <li><img style={{"height":"70px"}} src={ awsImg } /></li>
                  <li><img style={{"height":"70px"}} src={ herokuImg } /></li>
                  <li><img style={{"height":"70px"}} src={ travisImg } /></li>
                  <li><img style={{"height":"70px"}} src={ jenkinsImg } /></li>
                </ul>
              </div>
              <div className="hint-deploy"><Icon name="warning" /> For this beta version authmoated methodes dosnt work :( We are integrating them ...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeployManager;
