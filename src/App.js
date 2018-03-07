import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import { Select, i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en'

import 'element-theme-default-custom';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './containers/Home';
import Header from './components/Header';
import Dashboard from './containers/dashboard';
import Wizard from './containers/wizard';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Home} />            
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/wizard" exact component={Wizard} />            
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

i18n.use(locale);
