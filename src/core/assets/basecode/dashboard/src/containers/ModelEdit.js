/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Component } from 'react';

import { Loading, Button, Input, Switch, Select, Upload, Notification,
         Form, InputNumber, DatePicker, i18n, Slider } from 'element-react';

import locale from 'element-react/src/locale/lang/en'
import SaveIcon from 'react-icons/lib/go/plus';
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { CompactPicker } from 'react-color'
import axios from 'axios';

require('element-theme-default');
var CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

class ModelEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
     properties: this.props.model_config.properties,
     defaultText: '',
     loading: true,
     fullscreen: true,
     fileList: [],
     redirect: false,
     redirect_url: null,
     form: {},
     rules:{}
    };
  }
  componentWillMount() {
     this.scanModels();
     this.fetchModelData();
  }
  fetchModelData(){
    const self = this;
    const url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/';

    axios.get(url+this.props.model+'s/'+window.location.pathname.split('update/')[1],{
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authorized_user')).id
      }
    }).then( (response) => {

      if (response.status == 200) {
        let tmp_form = self.state.form;

        for(var prop in response.data){
          //if(prop != "id"){
            if(response.data[prop] != "")
              tmp_form[prop] = response.data[prop];
            else {
                tmp_form[prop] = "";
            }
          //}
          self.setState({loading:false,fullscreen:false,form: tmp_form})
        }
      } else {
        self.showMessage('Error','Entry not available !','error');
        self.setState({loading:false,fullscreen:false,redirect:true,redirect_url:'/'+this.props.model});
      }
    })
  }
  saveModel(e){

    e.preventDefault();
    const self = this;
    const url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/';
    this.refs.form.validate((valid) => {
      if (valid) {

        self.setState({ loading: true,fullscreen:true })

        var xhr  = new XMLHttpRequest();
        const url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/';
        xhr.onload = function(){
          if(xhr.status==200){
            var response = JSON.parse(xhr.response);
            self.showMessage('Updated :)','Successfully Entry Updated !','success');
            self.setState({loading:false,fullscreen:false,redirect:true,redirect_url:'/'+self.props.model});
          } else {
            self.setState({loading:false,fullscreen:false});
            self.showMessage('Error :(',JSON.parse(xhr.response).error.message.toString(),'error')
          }

        }

        var form_data = new FormData();
        for ( var key in self.refs.form.props.model ) {
            form_data.append(key, self.refs.form.props.model[key]);
        }
        xhr.open ('PATCH', url+self.props.model+'s/'+window.location.pathname.split('update/')[1], true);
        xhr.setRequestHeader('Authorization',JSON.parse(localStorage.getItem('authorized_user')).id);

        xhr.send (form_data);
        return false;

      } else {
        return false;
      }
    });

  }
  onFormChange(value,key) {
    let _obj = { [key]: value };
    let _form = Object.assign({}, this.state.form, _obj);

    this.setState({
      form: _form
    });
  }
  scanModels(){
    let properties = this.state.properties;
    let formModel = this.state.form;

    const self = this;

    for(var property in properties){

      if( property == 'id' ) continue;

      var required = properties[property].required || false;

      if(required==true && properties[property].type != 'boolean' ){
        var tmp_rules = this.state.rules;
        tmp_rules[property] = [{
          required: true,
          message: 'Please Fill '+property+' Input',
          trigger: 'change'
        }];
        self.setState({ rules: tmp_rules });
      }

      formModel[property] = "";

      if(properties[property].type=="string"){
        formModel[property] = "";
      }
      if(properties[property].type=="object"){
        formModel[property] = {};
      }

      if(properties[property].type.toLowerCase()=="date"){
        formModel[property] = properties[property].options.default || new Date();
      }

      if(properties[property].type.toLowerCase()=="boolean"){
        formModel[property] = false;
      }

      if(typeof properties[property].uiType != "undefined"){

        if(properties[property].uiType.toLowerCase()=="select"){
          formModel[property] = properties[property].options.selectItems[0].value;
        }

        if(properties[property].uiType.toLowerCase()=="date"){
          formModel[property] = properties[property].options.default || new Date();
        }

        if(properties[property].uiType.toLowerCase()=="slider"){
          formModel[property] = properties[property].options.default || 0;
        }

        if(properties[property].uiType.toLowerCase()=="editor" ||
          properties[property].uiType.toLowerCase()=="html" ||
          properties[property].uiType.toLowerCase()=="code"){
          formModel[property] = properties[property].options.default || "";
        }

        if(properties[property].uiType.toLowerCase() == 'relationship'){
          const url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/';
          axios.get(url+properties[property].options.ref+'?filter={"where":'+JSON.stringify(properties[property].options.filter)+'}').
          then( (body) => {
            properties[property]['data'] = body;

            self.setState({'properties':properties});
           // self.setState({'loading':false,fullscreen:false});
          }).catch( (ex) => {
           // self.setState({'loading':false,fullscreen:false});
          });
        }
        if(properties[property].uiType.toLowerCase() == 'file'){
          formModel[property] = [];
        }
      }
    }
    this.setState({ form: formModel });
  }

  handleSuccess(file,key) {
    let tmp = this.state.form;
    tmp[key] = file.result.files.file;
    this.setState({ form: tmp })
  }
  showMessage(title,msg,type) {
    Notification({
      title: title,
      message: msg,
      type: type
    });
  }
  changeState(_obj){
    this.setState({
      form: Object.assign({}, this.state.form, _obj)
    });
  }
  handleError(err){
    this.showMessage('Error',err.toString(),'error')
  }
  handleRemove(file, fileList,key) {
    let tmp = this.state.form;
    tmp[key] = fileList;
    this.setState({ form: tmp })
  }
  render() {

    let form_fields = [];
    let properties = this.state.properties;
    let hiddens = this.props.model_config.hidden || [];
    var self = this;
    const api_url = 'http://'+this.props.configs.SERVICE_HOST+':'+this.props.configs.SERVICE_PORT+'/api/';

    if(!this.state.loading){
      Object.keys(properties).map(function (key,index) {

          var type = properties[key].type;
          if(typeof properties[key].uiType != "undefined")
            type = properties[key].uiType.toLowerCase();

          if(hiddens.indexOf(key)<0){
            switch(type){
              case 'string':case 'text':
                form_fields.push(<Form.Item prop={key} required={properties[key].required || false} label={key+' :'}><Input value={self.state.form[key]} onChange={ (value) => self.onFormChange(value,key) } type="text"></Input></Form.Item>);
                break;
              case 'boolean':
                form_fields.push(<Form.Item prop={key} label={key+' :'}><Switch value={self.state.form[key]} onChange={ (value) => self.onFormChange(value,key) } onColor="#13ce66" offColor="#aaa"></Switch></Form.Item>);
                break;
              case 'email':
                form_fields.push(<Form.Item prop={key} label={key+' :'}><Input value={self.state.form[key]} onChange={ (value) => self.onFormChange(value,key) } type="email"></Input></Form.Item>);
                break;
              case 'password':
                form_fields.push(<Form.Item prop={key} label={key+' :'}><Input value={self.state.form[key]} onChange={ (value) => self.onFormChange(value,key) }  type="password"></Input></Form.Item>);
                break;
              case 'url':
                form_fields.push(<Form.Item prop={key} label={key+' :'}><Input value={self.state.form[key]} onChange={ (value) => self.onFormChange(value,key) } prepend="http://" type="text"></Input></Form.Item>);
                break;
              case 'textarea':
                form_fields.push(<Form.Item prop={key} label={key+' :'}><Input onChange={ (value) => self.onFormChange(value,key) } autosize={ {minRows: 3} } value={self.state.form[key]} type={'textarea'} ></Input></Form.Item>);
                break;
              case 'number':case 'money':
                form_fields.push(<Form.Item prop={key} label={key+' :'}><InputNumber value={self.state.form[key]}  defaultValue={0} onChange={ (value) => self.onFormChange(value,key) } type="text"></InputNumber></Form.Item>);
                break;
              case 'select':
                form_fields.push(
                  <Form.Item prop={key} label={key}>
                    <Select onChange={ (value) => self.onFormChange(value,key) } multiple={properties[key].multiple || false} value={self.state.form[key]}>
                    {
                      properties[key].options.selectItems.map(el => {
                        return <Select.Option key={el.value} label={el.label} value={el.value} />
                      })
                    }
                    </Select>
                  </Form.Item>);
                  break;
              case 'date':
                var options = properties[key].options || {};
                form_fields.push(<Form.Item prop={key} label={key+' :'}><DatePicker
                    value={ self.state.form[key] }
                    placeholder="Pick a day"
                    format={ options.format || null }
                    selectionMode={ options.selectionMode || null }
                    onChange={ (date) => self.onFormChange(date,key) }
                  />
                </Form.Item>);
                break;

              case 'slider':
                var options = properties[key].options || {};
                form_fields.push(<Form.Item prop={key} label={key+' :'}>
                  <Slider onChange={ (value) => self.onFormChange(value,key) } value={self.state.form[key]} name={key} min={options.min || 0} range={options.range || false}
                  step={options.step || 1} max={options.max || 100} showTooltip={options.showTooltip || true}
                  disabled={options.disabled || false } showStops={options.showStops || false} />
                </Form.Item>);
              break;

              case 'editor':case 'html':

                var modules = {
                  toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                  ],
                },formats= [
                  'header',
                  'bold', 'italic', 'underline', 'strike', 'blockquote',
                  'list', 'bullet', 'indent',
                  'link', 'image'
                ];

               form_fields.push( <Form.Item prop={key} label={key+' :'}>
                  <ReactQuill onChange={ (value) => self.onFormChange(value,key) } value={self.state.form[key]} modules={modules}
                      formats={formats} />
                </Form.Item>)
                break;

              case 'code':
                var options = properties[key].options || {lineNumbers: true,mode: 'javascript'};
                form_fields.push(<Form.Item prop={key} label={key+' :'}><CodeMirror onChange={ (newValue) => self.onFormChange(newValue,key) } value={self.state.form[key]} options={options} /></Form.Item> )
                break;

              case 'color':
                var options = properties[key].options || {};
                form_fields.push(<Form.Item prop={key} label={key+' :'}><CompactPicker value={self.state.form[key]} onChange={ (value) => self.onFormChange(value.hex,key) }  /></Form.Item> )
                break;

              case 'file':
                var options = properties[key].options || {};
                form_fields.push(
                <Form.Item prop={key} label={key+' :'}>
                  <Upload
                    className="upload-demo"
                    action={api_url+'uploads/files/upload'}
                    onSuccess={file => self.handleSuccess(file,key)}
                    onRemove={(file, fileList,key) => self.handleRemove(file, fileList,key)}
                    handleError={ (err)=>self.handleError(err) }
                    fileList={self.state.form[key]}
                    tip={<div className="el-upload__tip">{options.tip || ""}</div>}
                    accept={options.accept}
                  >
                    <Button size="small" type="primary">Click to upload</Button>
                  </Upload>
                </Form.Item> )
                break;

              case 'relationship':
                var options = properties[key].options || {};
                var data = properties[key].data.data || {};
                self.state.form[key] = data[0][options.key];

                form_fields.push(<Form.Item label={key}>
                  <Select prop={key} onChange={ (value) => self.onFormChange(value,key) } value={self.state.form[key]} multiple={options.multiple || false}>
                  {
                    data.map(el => {
                      return <Select.Option key={el[options.key]} label={options.key+': '+el[options.key]} value={el[options.key]} />
                    })
                  }
                  </Select>
                </Form.Item>);
                break;

            }
          }
      });
    }

    return (
        <div className="model-create">
          <Loading text="Loading ..." loading={this.state.loading} fullscreen={this.state.fullscreen}></Loading>
          {
            !this.state.loading ? <div><h3><SaveIcon size={20} /> Edit Entry <span>( { this.state.form.id } )</span></h3>
              <Form rules={this.state.rules} model={this.state.form} ref="form" labelWidth="180">
                {
                  form_fields
                }
                <Form.Item className="actionBar">
                  <Button onClick={ this.saveModel.bind(this) } type="primary">Update Entry</Button>
                </Form.Item>
              </Form></div> : null
          }
          {
            (this.state.redirect) ? <Redirect to={this.state.redirect_url}/> : null
          }
        </div>
    );
  }
}

i18n.use(locale);
export default ModelEdit;
