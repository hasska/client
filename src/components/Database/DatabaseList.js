import React, { Component } from 'react';

class DatabaseList extends Component {

  render() {
    return (
			<div className="app-sub-nav sub-nav-database">
			  <div className="sub-nav-header">
			    <div className="sub-nav-title">
			      <h5>Databases</h5>
			    </div>
			    <div className="sub-nav-action">
			      <a onClick={ ()=> this.props.newDb() } className="app-button icon-button">
			        <i className="el-icon-plus"></i>
			      </a>
			    </div>
			  </div>
			  <div className="sub-nav-body">
			    <ul>
          {
            this.props.databases.map( (db)=> {
              let cname = this.props.selectedDb == db.name ? 'active' : '';
              return <li onClick={ ()=>this.props.switchDb(db.name) } className={cname}>
  			        <h6>{db.name + '('+db.connector+')'}</h6>
  			        <i className="el-icon-arrow-right"></i>
  			      </li>
            })
          }
			    </ul>
			  </div>
			</div>
    );
  }
}

export default DatabaseList;
