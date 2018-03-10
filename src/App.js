import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import './custom.css';

import { Select, i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en'

import 'element-theme-default';

import { HashRouter, Route } from 'react-router-dom';

import Home from './containers/Home';
import Header from './components/Header';
import Dashboard from './containers/dashboard';
import Wizard from './containers/wizard';

export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route path="/" exact component={Home} />            
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/wizard" component={Wizard} />            
          </div>
        </HashRouter>
      </div>
    );
  }
}

i18n.use(locale);
