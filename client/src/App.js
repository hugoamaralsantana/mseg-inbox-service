import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import login from './components/pages/login';
import landingPage from './components/pages/landingPage';
import assignedTraining from './components/pages/assignedTraining';
import performanceReview from './components/pages/performanceReview';
import PTORequest from './components/pages/PTORequest';
import profilePage from './components/pages/profilePage';
import settings from './components/pages/settings';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={login} />
          <Route path='/landingPage' component={landingPage} />
          <Route path='/assignedTraining' component={assignedTraining} />
          <Route path='/performanceReview' component={performanceReview} />
          <Route path='/PTORequest' component={PTORequest} />
          <Route path='/profilePage' component={profilePage} />
          <Route path='/settings' component={settings} />
        </div>
      </Router>
    );
  }
}

export default App;
