import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HomeIntro from '../components/Home/HomeIntro';
import HomeStart from '../components/Home/HomeStart';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    return (
        <div>
          <div className="home-wrapper">
              <div className="home-body">
                <HomeIntro />
                <HomeStart />
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
