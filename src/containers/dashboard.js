import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Progress, Dialog, Loading, Tabs, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';

import Title from '../components/Title';

import navOverview from "../dist/img/nav-overview.svg";
import navModels from "../dist/img/nav-models.svg";
import navDb from "../dist/img/nav-db.svg";
import navApi from "../dist/img/nav-api.svg";
import navAdmindashboard from "../dist/img/nav-admindashboard.svg";
import navDocuments from "../dist/img/nav-documents.svg";
import navMonitoring from "../dist/img/nav-monitoring.svg";
import navStatistic from "../dist/img/nav-statistic.svg";
import haskaType from "../dist/img/haska.svg";
import run from "../dist/img/run.svg";
import stop from "../dist/img/stop.svg";
import clean from "../dist/img/clean.svg";
import build from "../dist/img/build.svg";
import publish from "../dist/img/publish.svg";



require('element-theme-default');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      dialogVisible: false,
      options:{
        name: '',
        region: '',
      },
      info: {
        modelName: '',
        modelType: '',
        modelDB: '',
      },
      types: [{
        value: 'persistModel',
        label: 'Persist Model'
      }, {
        value: 'baseModel',
        label: 'Base Model'
      }],
      typeValue: '',
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
      dbValue: '',
      propTypes:[{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }],
      propType: '',




      columns: [
        {
          label: "Name",
          prop: "name",
          render: function(data){
            return (
              <Input></Input>
            )
          }
        },
        {
          label: "Type",
          prop: "type",
          render: function(data){
            return (
              <Select value="">
                    <Select.Option label="op1" value="op1" />
              </Select>
            )
          }
        },
        {
          label: "Index",
          prop: "indexKey",
          width: "60px",
          render: function(data){
            return (
              <Checkbox></Checkbox>
        )
          }
        },
        {
          label: "UI Type",
          prop: "uiType",
          render: function(data){
            return (
              <Select value="">
                    <Select.Option label="op1" value="op1" />
              </Select>
            )
          }
        },
        {
          label: "Initial",
          prop: "initial",
          width: "60px",
          render: function(data){
            return (
              <Checkbox></Checkbox>
            )
          }
        },
        {
          label: "Validation",
          prop: "validation",
          render: function(data){
            return (
              <Input></Input>
            )
          }
        },
        {
          label: "Relation",
          prop: "relation",
          render: function(data){
            return (
              <Select value="">
                <Select.Option label="op1" value="op1" />
              </Select>
            )
          }
        }, {
          label: "",
          prop: "relation",
          width: "50px",
          render: function(data){
            return (
              <span className="row-actions">
                <Button type="text" onClick={ () => this.setState({ dialogVisible: true }) }><Icon name="setting"/></Button>
                <Button type="text" ><Icon name="delete"/></Button>

              </span>

              )
          }
        },],
      data: [{
        date: '',
        name: '',
      },],

    };
  }

  onChange(key, value) {
    this.state.info[key] = value;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentWillMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    return (
        <div>
          <div className="app-wrapper">
              <div className="app-header">
                <div className="window-actions">
                  <div className="name">
                    haska
                  </div>
                </div>
                <div className="header-layout">
                  <div className="header-left">
                    <div className="project-name">
                        monosority <i className="el-icon-arrow-down"></i>
                    </div>
                  </div>
                  <div className="header-center">
                    <div className="project-status-wrapper">
                      <div className="project-name">
                        monosority
                      </div>
                      <div className="project-status">
                        Build succeeded!
                      </div>
                    </div>
                  </div>
                  <div className="header-right">
                    <div className="project-actions">
                      <a className="action-run"><img src={run} /></a>
                      <a className="action-stop"><img src={stop} /></a>
                    </div>
                  </div>
                </div>
                <div className="progress-bar">
                  <Progress percentage={30} showText={false}/>
                </div>
              </div>
              <div className="app-body">
                  <div className="app-nav">
                    <ul className="nav-container">
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navOverview} /></div>
                          <div>Overview</div>
                        </div>
                      </li>
                      <li className="active">
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navModels} /></div>
                          <div>Models</div>
                        </div>
                      </li>
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navDb} /></div>
                          <div>Databases</div>
                        </div>
                      </li>
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navApi} /></div>
                          <div>APIs</div>
                        </div>
                      </li>
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navAdmindashboard} /></div>
                          <div>Admin Dashboard</div>
                        </div>
                      </li>
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navMonitoring} /></div>
                          <div>Monitoring</div>
                        </div>
                      </li>
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navStatistic} /></div>
                          <div>Statistics</div>
                        </div>
                      </li>
                      <li>
                        <span></span>
                        <div className="nav-section">
                          <div><img src={navDocuments} /></div>
                          <div>Documentation</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="app-window">
                    <div className="app-top">
                      <div className="app-sub-nav sub-nav-model">
                        <div className="sub-nav-header">
                          <div className="sub-nav-title">
                            <h5>Models</h5>
                          </div>
                          <div className="sub-nav-action">
                            <a className="app-button icon-button">
                              <i className="el-icon-plus"></i>
                            </a>
                          </div>
                        </div>

                        <div className="sub-nav-body">
                          <ul>
                            <li>
                              <h5>users</h5>
                              <i className="el-icon-arrow-right"></i>
                            </li>
                            <li className="active">
                              <h5>customers</h5>
                              <i className="el-icon-arrow-right"></i>
                            </li>
                            <li>
                              <h5>products</h5>
                              <i className="el-icon-arrow-right"></i>
                            </li>
                            <li>
                              <h5>tags</h5>
                              <i className="el-icon-arrow-right"></i>
                            </li>
                            <li>
                              <h5>comments</h5>
                              <i className="el-icon-arrow-right"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="app-preview">
                        <div className="model-single">
                          <div className="model-info-wrapper">
                            <Title contnet="Modal Info" />
                            <div className="model-info-form">
                              <Form className="en-US form-custom-style" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="Name">
                                  <Input value={this.state.info.modelName} onChange={this.onChange.bind(this, 'modelName')}></Input>
                                </Form.Item>
                                <div className="half-flex">
                                  <Form.Item label="Type">
                                    <Select value={this.state.typeValue}>
                                      {
                                        this.state.types.map(el => {
                                          return <Select.Option key={el.value} label={el.label} value={el.value} />
                                        })
                                      }
                                    </Select>
                                  </Form.Item>
                                  <Form.Item label="Database">
                                    <Select value={this.state.dbValue}>
                                      {
                                        this.state.dbs.map(el => {
                                          return <Select.Option key={el.value} label={el.label} value={el.value} />
                                        })
                                      }
                                    </Select>
                                  </Form.Item>
                                </div>
                              </Form>
                            </div>
                          </div>
                          <div className="model-properties-wrapper">
                            <Title contnet="Properties" />
                            <div className="model-properties-table">
                              <Table
                                style={{width: '100%'}}
                                columns={this.state.columns}
                                data={this.state.data}
                                border={true}
                                maxHeight={270}
                                highlightCurrentRow={true}
                                onCurrentChange={item=>{console.log(item)}}
                              />
                              <Button className="app-button new-row" >New</Button>
                              <Dialog
                                title="Shipping Address"
                                visible={ this.state.dialogVisible }
                                onCancel={ () => this.setState({ dialogVisible: false }) }
                              >
                                <Dialog.Body>
                                  <Form model={this.state.options}>
                                    <Form.Item label="Promotion name" labelWidth="120">
                                      <Input value={this.state.options.name}></Input>
                                    </Form.Item>
                                    <Form.Item label="Zones" labelWidth="120">
                                      <Select value={this.state.options.region} placeholder="Please select a zone">
                                        <Select.Option label="Zone No.1" value="shanghai"></Select.Option>
                                        <Select.Option label="Zone No.2" value="beijing"></Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </Form>
                                </Dialog.Body>
                                <Dialog.Footer className="dialog-footer">
                                  <Button onClick={ () => this.setState({ dialogVisible: false }) }>取 消</Button>
                                  <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确 定</Button>
                                </Dialog.Footer>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="app-editor">
                    </div>
                  </div>
              </div>
          </div>
        </div>
    );
  }
}

// mapped props to the component
const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

// Inject the Params provided by React Router into connected components
export default withRouter(connect(mapStateToProps)(Dashboard));
