/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import navOverview from "../../dist/img/nav-overview.svg";
import navModels from "../../dist/img/nav-models.svg";
import navDb from "../../dist/img/nav-db.svg";
import navApi from "../../dist/img/nav-api.svg";
import navAdmindashboard from "../../dist/img/nav-admindashboard.svg";
import navDocuments from "../../dist/img/nav-documents.svg";
import navMonitoring from "../../dist/img/nav-monitoring.svg";
import navStatistic from "../../dist/img/nav-statistic.svg";
import Title from '../../components/Title';
import { Popover, Tooltip, Progress, Dialog, Loading, Tabs, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';
import { Redirect } from 'react-router'

class ModelCreator extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: this.props.active,
      navigate: false,
      form: {},
      info: {
        modelName: '',
        modelType: '',
        modelDB: '',
      },
      types: [{
        value: 'PersistedModel',
        label: 'Persisted Model'
      }, {
        value: 'BaseModel',
        label: 'Base Model',
        disabled: true
      }],
      dbs: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }],
      currentModel: null
    }
  }
  changeRoute(route){
    this.setState({'active':route,navigate:true});
  }
  onSubmit(e) {
    e.preventDefault();
  }
  onChange(key, value) {
    this.state.info[key] = value;
    this.forceUpdate();
  }
  render() {
    return (
      <div className="model-info-wrapper">
        <Title contnet="MODEL CONFIGURATION" />
        <div className="model-actions">
          <Tooltip placement="top" content={ this.props.createMode == true ? 'Create'  : 'Apply Changes' }><Button type="primary" onClick={ ()=>this.props.publishModels() } size="small" className="publish-model" icon="check">Save Changes</Button></Tooltip>
          { !this.props.createMode && <Tooltip placement="top" content={"Delete"}><Button onClick={ ()=>this.props.removeModel(this.props.selectedModel) } type="text" size="small" className="remove-model"><i className="el-icon-delete2"></i></Button></Tooltip> }
        </div>
        <div className="model-info-form">
          { this.props.currentModel && <Form className="en-US form-custom-style" model={this.props.currentModel} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
            <div className="triple-flex">
              <Form.Item label="Name">
              {
                this.props.createMode == true ?
                <Input onChange={this.props.updateModel.bind(this, 'name')} value={this.props.currentModel.name}></Input> :
                <Input disabled value={this.props.currentModel.name}></Input>
              }
              </Form.Item>
              <Form.Item label="Type">
                <Select onChange={this.props.updateModel.bind(this, 'base')} value={this.props.currentModel.base || 'PersistedModel'}>
                  {
                    this.state.types.map(el => {
                      return <Select.Option key={el.value} label={el.label} value={el.value} />
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item label="Database">
                <Select onChange={this.props.changeDb.bind(this)} value={this.props.selectedDB}>
                  {
                    this.props.databases.length > 0 && this.props.databases.map(db => {
                      return <Select.Option key={db.name} label={db.name + ' | '+db.connector} value={db.name} />
                    })
                  }
                </Select>
              </Form.Item>
            </div>
            <div className="model-options">
              <Form.Item label="Options">
                <Tooltip placement="top" content={"Whether to automatically add an id property to the model."}>
                  <Checkbox onChange={this.props.updateModel.bind(this, 'idInjection')} label="Id Injection" checked={this.props.currentModel.idInjection || false}></Checkbox>
                </Tooltip>
                <Tooltip placement="top" content={"prevents clients from setting the auto-generated ID value manually."}>
                  <Checkbox onChange={this.props.updateModel.bind(this, 'forceId')} label="Generate Id" checked={this.props.currentModel.forceId || false}></Checkbox>
                </Tooltip>
                <Tooltip placement="top" content={"enforce valid model data"}>
                  <Checkbox onChange={this.props.updateModel.bind(this, 'validateUpsert',true)} label="Validation Upsert" checked={this.props.currentModel.options.validateUpsert || false}></Checkbox>
                </Tooltip>
                <Tooltip placement="top" content={"Allow access tokens that never expire."}>
                  <Checkbox onChange={this.props.updateModel.bind(this, 'allowEternalTokens',true)} label="allow Eternal Tokens" checked={this.props.currentModel.options.allowEternalTokens || false}></Checkbox>
                </Tooltip>
              </Form.Item>
            </div>
          </Form> }
        </div>
      </div>
    );
  }
}

export default ModelCreator;
