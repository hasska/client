/**
 * Copyright (c) Haska.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import './index.css';

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
