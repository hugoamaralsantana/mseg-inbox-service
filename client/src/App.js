import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import './styles/custom.scss'


import Login from './components/pages/login';
import LandingPage from './components/pages/landingPage';
import AssignedTraining from './components/pages/assignedTraining';
import PerformanceReview from './components/pages/performanceReview';
import PTORequest from './components/pages/PTORequest';
import ProfilePage from './components/pages/profilePage';
import Settings from './components/pages/settings';

const App = () => {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/landingPage' component={LandingPage} />
          <Route path='/assignedTraining' component={AssignedTraining} />
          <Route path='/performanceReview' component={PerformanceReview} />
          <Route path='/PTORequest' component={PTORequest} />
          <Route path='/profilePage' component={ProfilePage} />
          <Route path='/settings' component={Settings} />
        </div>
      </Router>
      
    );
}

export default App;
