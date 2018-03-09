/**
 * Copyright (c) 2018-present, Abject.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";

import ModelsList from './containers/ModelList';
import ModelsCreate from './containers/ModelCreate';
import ModelsEdit from './containers/ModelEdit';

export const fetchModels = (configs,token,callback) => {
  
  let _models = require('./models/model-config.json');
  let DYNAMIC_ROUTES = [];
 
  delete _models.ACL;
  delete _models.AccessToken;
  delete _models.Role;
  delete _models._meta;
  delete _models.RoleMapping;

  for(let model in _models){
   
    let _model_config;

    if(model == 'User')
      _model_config = require('./models/common/User.json');
    else
      _model_config = require('./models/common/models/'+model+'.json');

    DYNAMIC_ROUTES.push(<div>
        <Route activeOnlyWhenExact={true} exact path={'/'+model} render={(props) => ( <ModelsList model_config={_model_config} token={token} model={model} model_data={_models[model]} configs={configs} /> )} />
        <Route exact path={'/'+model+'s/create'} render={(props) => ( <ModelsCreate model_config={_model_config} token={token} model={model} model_data={_models[model]}  configs={configs} /> )} />
        <Route path={'/'+model+'s/update/:id'} render={(props) => ( <ModelsEdit token={token} id={props.id} model_config={_model_config} model={model} model_data={_models[model]} configs={configs} /> )} /></div>);
  }

  console.log(DYNAMIC_ROUTES)
  callback(_models,DYNAMIC_ROUTES);
        

}