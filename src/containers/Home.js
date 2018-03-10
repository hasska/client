import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HomeIntro from '../components/Home/HomeIntro';
import HomeStart from '../components/Home/HomeStart';
import axios from 'axios';
import { Loading } from 'element-react';
import { fetchProjects } from '../actions/projects'

require('element-theme-default');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []  
    };
  }
  componentWillMount() {
    const self = this;
    fetchProjects( (response) => {
      self.setState({'projects':response.data});
    })
  }
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    return (
        <div>
          <div className="home-wrapper">
              <div className="home-body">
                <HomeIntro />
                <HomeStart projects={this.state.projects} />
              </div>
          </div>
        </div>
    );
  }
}

// mapped props to the component
const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

// Inject the Params provided by React Router into connected components
export default withRouter(connect(mapStateToProps)(Home));
