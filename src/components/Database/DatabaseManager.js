import React, { Component } from 'react';
import DatabaseList from './DatabaseList';
import DatabaseSingle from './DatabaseSingle';
class DatabaseManager extends Component {
  render() {
    return (
      <div className="app-window">
      	<DatabaseList />
      	<DatabaseSingle />
      </div>
    );
  }
}

export default DatabaseManager;
