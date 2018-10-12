/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
                  <b>*</b> Please go to your project root directory and remove <small>node_modules</small> and then your project directory will be ready for deployment by git or any deployment methodes.
                  Follow instructions to run your project.
                  <br /><br />
                  * To change your ports and enviroment configs go to settings and set your desired configurations.
                </p>
                <div className="ins-codes">
                  <p>Install packages in root and dashboard directories :</p>
                  <code className="commands">npm install</code>
                  <p>Running API services :</p>
                  <code className="commands">node .</code>
                  <p>Running admin dashboard :</p>
                  <code className="commands">npm start</code>
                  <br />
                  API Base url: <code>http://127.0.0.1:8080/api</code>
                  <br />API explorer: <code>http://127.0.0.1:8080/explorer</code>
                  <br />Admin dashboard: <code>http://127.0.0.1:3006</code>
                  <br />Monitoring: <code>http://127.0.0.1:8080/swagger-stats/ui</code>

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
