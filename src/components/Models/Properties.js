import React, { Component } from 'react';
import navOverview from "../../dist/img/nav-overview.svg";
import navModels from "../../dist/img/nav-models.svg";
import navDb from "../../dist/img/nav-db.svg";
import navApi from "../../dist/img/nav-api.svg";
import navAdmindashboard from "../../dist/img/nav-admindashboard.svg";
import navDocuments from "../../dist/img/nav-documents.svg";
import navMonitoring from "../../dist/img/nav-monitoring.svg";
import navStatistic from "../../dist/img/nav-statistic.svg";
import { Popover, Progress, Dialog, Loading, Tabs, Form, Input, Checkbox, Radio, Button, Select, Icon, Tag, Table, Dropdown } from 'element-react';
import Title from '../../components/Title';

import { Redirect } from 'react-router'

class ModelProperties extends Component {
  constructor(props){
    super(props)
    const self = this;
    this.state = {
      active: this.props.active,
      dialogVisible: false,
      hiddens: [],
      protected: [],
      modelOptions:['hidden','defaultColumn'],
      dialogData: [],
      relationsType: [{
        label: 'hasMany',value: 'hasMany'
      }, {
        label: 'belongsTo',value: 'belongsTo'
      }, {
        label: 'hasAndBelongsToMany',value: 'hasAndBelongsToMany'
      }],
      properties: [],
      navigate: false,
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
              <Input onChange={ self.props.updateModelProps.bind(self,'label',data.name) } value={data.name} />
            )
          }
        },
        {
          label: "Type",
          prop: "type",
          render: function(data){
            return (
              <Select onChange={ self.props.updateModelProps.bind(self,'type',data.type,data.name) } value={data.type}>
                    <Select.Option label="Number" value="number" />
                    <Select.Option label="Object" value="object" />
                    <Select.Option label="String" value="string" />
                    <Select.Option label="Any" value="any" />
                    <Select.Option label="Array" value="array" />
                    <Select.Option label="Boolean" value="boolean" />
                    <Select.Option label="Buffer" value="buffer" />
                    <Select.Option label="Date" value="date" />
                    <Select.Option label="DateString" value="dateString" />
                    <Select.Option label="Null" value="null" />
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
              <Checkbox onChange={ self.props.updateModelProps.bind(self,'id',data.indexKey,data.name) } checked={data.indexKey ? 'checked' : ''}></Checkbox>
        )
          }
        },
        {
          label: "UI Type",
          prop: "uiType",
          render: function(data){
            return (
              <Select onChange={ self.props.updateModelProps.bind(self,'uiType',data.uiType,data.name) } value={data.uiType || ""}>
                    <Select.Option label="Email" value="email" />
                    <Select.Option label="Password" value="password" />
                    <Select.Option label="Money" value="money" />
                    <Select.Option label="Url" value="url" />
                    <Select.Option label="Text" value="text" />
                    <Select.Option label="Date" value="date" />
                    <Select.Option label="Textarea" value="textarea" />
                    <Select.Option label="Text Editor" value="html" />
                    <Select.Option label="Code" value="code" />
                    <Select.Option label="Color" value="color" />
                    <Select.Option label="Slider" value="slider" />
                    <Select.Option label="Select" value="select" />
                    <Select.Option label="Relationship" value="relationship" />
                    <Select.Option label="File" value="file" />
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
              <Checkbox onChange={ self.props.updateModelProps.bind(self,'required',data.initial,data.name) }  checked={data.initial}></Checkbox>
            )
          }
        },
        {
          label: "Validation",
          prop: "validation",
          render: function(data){
            let content = [];
            content.push(<Input onChange={ self.props.updateValidations.bind(self,'pattern',data.validations.pattern,data.name) } value={data.validations.pattern || ""} placeholder="Pattern (Regular expression)" />);
            content.push(<Input onChange={ self.props.updateValidations.bind(self,'max',data.validations.max,data.name) } value={data.validations.max || ""} type="number" placeholder="Max" />);
            content.push(<Input onChange={ self.props.updateValidations.bind(self,'min',data.validations.min,data.name) } value={data.validations.min || ""} placeholder="Min" />);
            content.push(<Input onChange={ self.props.updateValidations.bind(self,'length',data.validations.length,data.name) } value={data.validations.length || ""} placeholder="Length" />);

            return (
              <Popover placement="top" title="Validation" width="200" trigger="click" content={content}>
                <Button>Configure</Button>
              </Popover>
            )
          }
        },
        {
          label: "Relation",
          prop: "relations",
          render: function(data){
            let content = [];
            content.push(<Input onChange={ self.props.updateRelations.bind(self,'model',data.relations.model,data.name) } value={data.relations.model || ""} placeholder="ref (Model)" />);
            content.push(<Input onChange={ self.props.updateRelations.bind(self,'foreignKey',data.relations.foreignKey,data.name) } value={data.relations.foreignKey || ""} placeholder="foreign Key" />);
            content.push(<Input onChange={ self.props.updateRelations.bind(self,'filter',data.relations.filter,data.name) } value={data.relations.filter || ""} placeholder="Filter" />);
            content.push(<Select onChange={ self.props.updateRelations.bind(self,'type',data.relations.type,data.name) } placeholder={"Select Type"} value={data.relations.type || ""}>
                {
                  self.state.relationsType.map(type => {
                    return <Select.Option key={type.value} label={type.label} value={type.value} />
                  })
                }
              </Select>)
            return (
              <Popover placement="top" title="Validation" width="200" trigger="click" content={content}>
                <Button>Manage</Button>
              </Popover>
            )
          }
        }, {
          label: "",
          prop: "relation",
          width: "50px",
          render: function(data){
            return (
              <span className="row-actions">
                <Button type="text" onClick={ ()=>self.setState({dialogVisible:true,dialogData: data}) }><Icon name="setting"/></Button>
                <Button type="text" onClick={ ()=>self.removeProp(data) }><Icon name="delete2"/></Button>
              </span>
              )
          }
        },],
      data: [],
    }
  }
  showModal(){
    this.setState({ "dialogVisible": true })
  }
  componentWillReceiveProps(nextProps){
    setTimeout( ()=> {this.updateTableData()},500);
  }
  componentDidMount(){
    this.updateTableData();
  }
  addProp(){

    let _data = this.state.data, _model = this.props.currentModel,
     newProps = {
      name: 'propName'+parseInt(_data.length+1),
      type: 'string',
      indexKey: false,
      uiType: null,
      initial: false,
      options: { "defaultColumn": false,required: false },
      validations: [],
      relations: []
    };

    _model['properties'][newProps.name] = newProps;
    _data.push(newProps)

    console.log(_model);
    this.setState({ data: _data,currentModel: _model });
    this.updateTableData();

  }
  removeProp (data){
    let _data = this.state.data, _model = this.props.currentModel;

    delete _model['properties'][data.name];
    console.log(_model);

    for(var i in _data){
      if(_data[i].name==data.name)
        delete _data[i];
    }
    this.setState({ data: _data,currentModel: _model });
    this.updateTableData();

  }
  updateTableData(){
    let properties = [],validations = [],relationships = [],_data = [];

    if(this.props.currentModel){
      properties = this.props.currentModel.properties;
      validations = this.props.currentModel.validations || [];
      relationships = this.props.currentModel.relations || [];
      for(let prop in properties){

        if(typeof properties[prop] != "undefined"){
          let _options = properties[prop].options || {};

          let newProps = {
            name: prop,
            type: properties[prop].type || null,
            indexKey: properties[prop].id || false,
            uiType: properties[prop].uiType || null,
            initial: properties[prop].required || "",
            options: _options,
            validations: validations[prop] || [],
            relations: relationships[prop] || []
          };

          _data.push(newProps)

          if(this.state.dialogData.name == prop){
            this.setState({ dialogData: newProps })
          }
        }

      }

      this.setState({ data: _data,  hiddens: this.props.currentModel.hiddens || [], 'protected': this.props.currentModel.protected || [] })
    }
  }
  changeRoute(route){
    this.setState({'active':route,navigate:true});
  }
  render() {

    let options = this.state.dialogData.options || {};
    let selectItems = options.selectItems || [];
    let selectItems_filtered = [];
    for(let item in selectItems){
      selectItems_filtered.push(selectItems[item].value);
    }
    selectItems_filtered = selectItems_filtered.toString();

    return (
        <div className="model-properties-wrapper">
          <Title contnet="MODEL PROPERTIES" />
          <div className="model-properties-table">
            <Table
              style={{width: '100%'}}
              columns={this.state.columns}
              data={this.state.data}
              border={true}
              emptyText={"Empty Properties! Lets Add some :)"}
              onCurrentChange={item=>{console.log(item)}}
            />
            <Button onClick={ ()=>this.addProp() } className="app-button new-row" >+ New Property</Button>
            <Dialog
              title="Model Property Options"
              visible={ this.state.dialogVisible }
              onCancel={ () => this.setState({ dialogVisible: false,dialogData:[] }) }
            >
              <Dialog.Body>
                <Input onChange={ this.props.updateTypeOptions.bind(this,'default',this.state.dialogData.name) } className="default-option" placeholder={"Default Value"} value={options.default || ""} />
                <Checkbox onChange={this.props.updateTypeOptions.bind(this,'hidden',this.state.dialogData.name) } label="Hidden" checked={ this.state.hiddens[this.state.dialogData.name] || "" }></Checkbox>
                <Checkbox label="DefaultColumn" onChange={this.props.updateTypeOptions.bind(this,'defaultColumn',this.state.dialogData.name) } checked={options.defaultColumn ? options.defaultColumn.toString() : ""} />
                <div className="admin-options">
                <p>Admin Options</p>
                {
                  this.state.dialogData['uiType'] == 'date' &&
                  <Input className="default-option" onChange={this.props.updateTypeOptions.bind(this,'format',this.state.dialogData.name) } placeholder={"Date Format"} value={this.state.dialogData.options && this.state.dialogData.options.format || ""} />
                }
                {
                  this.state.dialogData['uiType'] == 'code' &&
                    <div>
                      <Input onChange={this.props.updateTypeOptions.bind(this,'mode',this.state.dialogData.name) } placeholder={"Code Mode (exp: javascript)"} value={this.state.dialogData.options && this.state.dialogData.options.mode || ""} />
                      <Checkbox onChange={this.props.updateTypeOptions.bind(this,'lineNumbers',this.state.dialogData.name) } label="Line Numbers" checked={this.state.dialogData.options && this.state.dialogData.options.lineNumbers || ""} />
                    </div>
                }
                {
                  this.state.dialogData['uiType'] == 'slider' &&
                  <div>
                    <Input onChange={this.props.updateTypeOptions.bind(this,'min',this.state.dialogData.name) } placeholder={"Min Range"} value={this.state.dialogData.options && this.state.dialogData.options.min || ""} />
                    <Input onChange={this.props.updateTypeOptions.bind(this,'max',this.state.dialogData.name) } placeholder={"Max Range"} value={this.state.dialogData.options && this.state.dialogData.options.min || ""} />
                    <Input onChange={this.props.updateTypeOptions.bind(this,'step',this.state.dialogData.name) } placeholder={"Step Value"} value={this.state.dialogData.options && this.state.dialogData.options.min || ""} />
                  </div>
                }
                {
                  this.state.dialogData['uiType'] == 'select' &&
                  <div>
                    <Input placeholder={"Select Items ( split items by | )"} onChange={this.props.updateTypeOptions.bind(this,'selectItems',this.state.dialogData.name) } value={selectItems_filtered || ""} />
                  </div>
                }
                </div>
              </Dialog.Body>
            </Dialog>
          </div>
        </div>
    );
  }
}

export default ModelProperties;
