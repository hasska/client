import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Select, i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en'

import 'element-theme-default';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './containers/Home';
import Header from './components/Header';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Home} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

i18n.use(locale);
