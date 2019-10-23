import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import Employee from './components/Employee'
import EmployeeDetails from './components/EmployeeDetails'
import Error from './components/Error'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <>
      <div className='container'>
        <h2>Employee Management App</h2>
        <Switch>
          <Route path='/employees' exact component={Employee}/>
          <Route path='/employees/:id'  component={EmployeeDetails}/>
          <Route component={Error}/>
        </Switch>
      </div>
      </>
      </Router>
    )
  }
}

render(<App />, document.getElementById("root"));
