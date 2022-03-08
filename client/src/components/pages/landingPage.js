import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class landingPage extends Component {
  render() {
    return (
      <div class="container">
        <h1>landingPage</h1>
        <div><Link class="row" to="/">Login</Link></div>
        <div><Link to="/assignedTraining">assignedTraining</Link></div>
        <div><Link to="/performanceReview">performanceReview</Link></div>
        <div><Link to="/PTORequest">PTORequest</Link></div>
        <div><Link to="/profilePage">profilePage</Link></div>
        <div><Link to="/settings">settings</Link></div>
      </div>

    )
  }
}