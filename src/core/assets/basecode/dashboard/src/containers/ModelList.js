/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
 
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import { Loading,Table,Layout,Button,Dropdown,Popover,Notification,
          Input,Select,Checkbox,Tooltip,Pagination,Dialog } from 'element-react';
import DirIcon from 'react-icons/lib/go/repo';
import DlIcon from 'react-icons/lib/go/cloud-download';
import ListIcon from 'react-icons/lib/go/list-ordered'
import TrashIcon from 'react-icons/lib/go/trashcan'
import EditIcon from 'react-icons/lib/go/pencil'

require('element-theme-default');

class ModelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modelCount: 0,
      modelColumns: [],
      modelData: [],
      fullscreen:true,
      originalData: [],
      selected: [],
      search: "",
      selectedColumns: [],
      allColumns: [],
      currentPage: 1,
      dialogVisible: false,
      totalItems: 10,
    };
  }
  componentWillMount() {
    const self = this;

    this.getModelColumns();
    this.getModelData();

    this.getModelCount(this.props.model, (count) => {
      self.setState({ modelCount: count });
    })
  }
  componentWillReceiveProps(nextProps) {
    
  }
  getPurl(){
    let purl = this.props.model;
        
    if(purl.slice(-1)=='y'){
      purl = purl.slice(0, -1);
      purl += 'ies';
    } else {
      if(purl.slice(-1) != 's'){
        purl += 's';
      }
    }

    return purl;
  }
  getModelData(page) {

    let currentPage = this.state.currentPage;
    if(page){
      currentPage = page;
    }
   
    const url = 'http://'+this.props.configs.SERVICE_HOST+":"+this.props.configs.SERVICE_PORT+"/api/"+this.getPurl()+'?filter[limit]='+this.state.totalItems+'&filter[skip]='+ ( parseInt(currentPage-1)*parseInt(this.state.totalItems) );
    const self = this;

    let properties = this.props.model_config.properties;
    self.setState({ loading:true,fullscreen:true });

    axios.get(url,{
      headers: {
        Authorization: this.props.token
      }
    }).then( (body) => {
      let filterData = [];
      self.setState({originalData: body.data});

      for(var i = 0 ; i<body.data.length ; i++){
          filterData[i] = [];
          filterData[i]['id'] = i+1;
          
          for(let column of self.state.modelColumns){
            
            if(column.prop == "id") continue;
            
            let second_value = "";
           
            if(column.prop == 'actions_table'){
              filterData[i]['idx'] = body.data[i].id;
            } else {
              if(typeof properties[column.prop].options != "undefined")
              second_value = properties[column.prop].options.default || "";

              filterData[i][column.prop] = body.data[i][column.prop] || second_value;
            }
            
          }
      }
      self.setState({ loading:false,fullscreen:false });

      self.setState({modelData: filterData});
    }).catch( (ex) => {
      self.setState({ loading:false,fullscreen:false });
      console.log('Models Data Fetch: '+ex);
    });

  }
  getModelColumns(){
    let columns = [],allColumns = [],selected = [];
    let properties = this.props.model_config.properties;
    let hiddens = this.props.model_config.hidden;

    const self = this;

    columns.push({ width:50, prop: 'id', label:'Id' });

    for(var property in properties){

      let defaultColumn = true;

      if(typeof properties[property]['options'] != 'undefined')
        defaultColumn = properties[property]['options'].defaultColumn || false;

      let label = properties[property].label || property;
      let currentColumn = this.state.selectedColumns.indexOf(property)>0;

      if( defaultColumn ){
        allColumns.push({key: property,checked: true,disabled:true});
        if( typeof hiddens != "undefined" ){
          if(hiddens.indexOf(property)<0){
            columns.push({  prop: property, label: label });
            selected.push(property);
          }
        } else {
            columns.push({  prop: property, label: label });
            selected.push(property);
        }
      } 
      else if(currentColumn){
        columns.push({  prop: property, label: label });
        selected.push(property);
        allColumns.push({key: property,checked: true,disabled:false});
      }
      else {
        allColumns.push({key: property,checked: false});
      }
    }

    columns.push({
      prop: "actions_table",
      label: "Actions",
      width: 140,
      render: function(row, column, index) {
        console.log(row)
        return (
          <div className="actions-btn">
          <Link className="btn-desktop" to={"/"+self.props.model+'s/update/'+row.idx}><Tooltip placement="bottom" content={"Edit Entry"}><EditIcon size={20} /></Tooltip></Link>
          <Link className="btn-desktop" to={"/"+self.props.model}><Tooltip placement="bottom" content={"Remove Entry"}><Button onClick={ () => self.setState({ dialogVisible: true, selected_delete: row.idx }) }><TrashIcon size={20} /></Button></Tooltip></Link>
          </div>
        )
      }
    })

    this.setState({ modelColumns: columns, allColumns: allColumns, selectedColumns: selected });
  }
  downloadJson(){
    var uri = 'data:text/csv;charset=utf-8,' + escape(JSON.stringify(this.state.originalData));
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = 'Data_Report'+ ".json";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  downloadCsv(){
    this.JSON2CSV(this.state.originalData, "Data_Report", true);
  }
  JSON2CSV(JSONData, ReportTitle, ShowLabel) {

      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      
      var CSV = '';    
      CSV += ReportTitle + '\r\n\n';

      if (ShowLabel) {
          var row = "";
          
          for (var index in arrData[0])
              row += index + ',';

          row = row.slice(0, -1);
          CSV += row + '\r\n';
      }
      
      for (var i = 0; i < arrData.length; i++) {
          var row = "";

          for (var index in arrData[i])
              row += '"' + arrData[i][index] + '",';
     
          row.slice(0, row.length - 1);
          CSV += row + '\r\n';
      }

      if (CSV == '') {        
          alert("Invalid data");
          return;
      }   
      
      var fileName = "MyReport_";
      fileName += ReportTitle.replace(/ /g,"_");   
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
      var link = document.createElement("a");    
      link.href = uri;
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
  getModelCount(model,callback){
    const url = 'http://'+this.props.configs.SERVICE_HOST+":"+this.props.configs.SERVICE_PORT+'/api/';
    axios.get(url+this.getPurl()+'/count',{
      headers: {
        'Authorization': this.props.token
      }
    }).then( (response) => {
      callback(response.data.count,model);
    }).then( (response) => {
    }).catch( (ex) => {
      callback(0,model);
    })
  }
  changeColumns(value){

  }
  deleteItem(){
    let selected = this.state.selected_delete;
    const self = this;
    if(selected != null){
      const url = 'http://'+this.props.configs.SERVICE_HOST+":"+this.props.configs.SERVICE_PORT+'/api/';
      axios.delete(url+this.getPurl()+'/'+selected,{
        headers: {
          Authorization: self.props.token
        }
      }).then( (body)=> {
        self.setState({ dialogVisible: false,selected_delete: null, loading: false,fullscreen: false })
        self.showMessage('Success','Entry Deleted Successfully !','success');
        self.getModelData();
        self.getModelCount(self.props.model, (count) => {
          self.setState({ modelCount: count });
        })
      }).catch( (ex) => {
        self.setState({ dialogVisible:false, selected_delete: null, loading: false,fullscreen: false })
        self.showMessage('Error',ex.toString(),'error');
      })
    } 
  }
  showMessage(title,msg,type) {
    Notification({
      title: title,
      message: msg,
      type: type
    });
  }
  handleCheckedChange(value){

    let tmp = this.state.selectedColumns, added_columns = this.state.modelColumns;
  
    if( value.length > 0){
      
      for(var i in tmp){
        delete tmp[i]
      }

      for(var i in value){
        if(tmp.indexOf(value[i])<0)
          tmp.push(value[i])
        else
          delete tmp[value]
      }
    } else {
      for(var i in tmp){
        delete tmp[i]
      }
    }

    this.setState({ selectedColumns: tmp });
    this.getModelColumns();
    this.getModelData();

  }
  changePage(page){
    console.log('S'+page)
    this.getModelData(page);
  }
  doSearch(value){
    var filter, table, tr, td, i;
    this.setState({ search: value });

    let input = this.state.search;
    filter = input.toUpperCase();
    tr = document.querySelectorAll('tbody tr');

      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll("td");
        for(var j = 0 ; j<td.length ; j++){
          var tmp = td[j];
          if (tmp) {
            if (tmp.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
              break;
            } else {
              tr[i].style.display = "none";
            }
          } 
        }
    }

  }
  render() {

    return (
        <div className="model-list">
          <Dialog
            title="Delete Entry"
            size="tiny"
            visible={ this.state.dialogVisible }
            onCancel={ () => this.setState({ dialogVisible: false }) }
            lockScroll={ false }
          >
            <Dialog.Body>
              <span>Would you sure to remove this entry from database ?</span>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button style={{'margin-left':'20px'}} onClick={ () => this.setState({ dialogVisible: false }) }>Cancel</Button>
              <Button type="primary" onClick={ () => this.deleteItem() }><TrashIcon /> Yes, Remove It</Button>
            </Dialog.Footer>
          </Dialog>
          <Loading loading={this.state.loading} fullscreen={this.state.fullscreen} />
          <Layout.Row gutter="24">
            <Layout.Col span="16">
              <h2><DirIcon size={25} /> { this.state.modelCount } { this.getPurl() }</h2>
            </Layout.Col>
            <Layout.Col span="8">
              <Link to={ this.props.model+'s/create' }><Button type="primary">+ Create Entry</Button></Link>
            </Layout.Col>
          </Layout.Row>
          <p>{ this.props.model_config.options.note || "" }</p>
          <Layout.Row gutter="24" className="model-list-toolbar">
            <Layout.Col span="12">
              <Input className="search-input" onChange={this.doSearch.bind(this)} placeholder={''} value={this.state.search} append={<Button type="default" icon="search">Search</Button>} />
            </Layout.Col>
            <Layout.Col span="12">
              
              <Popover placement="bottom" width="160" trigger="click" content={(
                <div style={{'margin-top': '10px'}}>
                  <b>Download Data : </b><span style={{color: '#999'}}>Select your output file format : </span>
                  <div>
                    <Button className="download-popup" size="default" type="mini" onClick={this.downloadJson.bind(this)}>JSON</Button>
                    <Button className="download-popup" type="default" size="mini" onClick={this.downloadCsv.bind(this)}>CSV</Button>
                  </div>
                </div>
              )}>
                <Button className="download-btn"><DlIcon /> Download</Button>
              </Popover>

              <Popover placement="bottom" width="200" trigger="click" content={(
                <div>
                  <Checkbox.Group options={this.state.selectedColumns} onChange={this.handleCheckedChange.bind(this)}>
                  {
                    this.state.allColumns.map( (el) => {
                      return <Checkbox className="columns-filter" disabled={el.disabled || false} label={el.key} checked={el.checked} label={el.key}></Checkbox>
                    })
                  }
                  </Checkbox.Group>
                </div>
              )}>
                <Button className="columns-btn"><ListIcon /> Columns</Button>
              </Popover>

            </Layout.Col>
          </Layout.Row>
          <Table
            style={{width: '100%'}}
            columns={this.state.modelColumns}
            data={this.state.modelData}
            border={true}
            stripe={true}
            highlightCurrentRow={true}
            emptyText={"No Data Available :( Make One now !"}
            onSelectChange={(selection) => { this.setState({ selected: selection }) }}
            onSelectAll={(selection) => { this.setState({ selected: selection }) }}
          />
          
          <Layout.Row>
            <Pagination onCurrentChange={ (currentPage) => this.changePage(currentPage)} currentPage={this.state.currentPage} pageSize={this.state.totalItems} layout="prev, pager, next,jumper, total" small={false} total={this.state.modelCount}/>
          </Layout.Row>
        </div>
    );
  }
}

export default ModelList;