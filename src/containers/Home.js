import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
<<<<<<< Updated upstream

import HomeIntro from '../components/Home/HomeIntro';
import HomeStart from '../components/Home/HomeStart';
=======
import axios from 'axios';
import { Loading } from 'element-react';
>>>>>>> Stashed changes



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  componentWillMount() {
<<<<<<< Updated upstream
=======
   axios.post('http://localhost:8000/projects/create',{
    title: 'test1',
    destination: '/Users/vt/Desktop/projects/sag',
    database: {
      name: 'test1',
      type: 'mongo',
      username: 'vah7id',
      password: '1234',
      host: '127.0.0.1',
      port: '2701'
    }
   }).then( ()=>{

   }).catch( ()=>{

   });
>>>>>>> Stashed changes
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
