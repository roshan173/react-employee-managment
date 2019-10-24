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
  refreshEmployees() {
    this.employee.refreshEmployees();
  }
  render() {
    return (
      <Router>
      <>
      <div className='container'>
        <h2>Employee Management App</h2>
        <Switch>
          <Route path='/employees' exact component={Employee} ref={employee => this.employee = employee}/>
          <Route path='/employees/:id'  component={EmployeeDetails} func={this.refreshEmployees.bind(this)}/>
          <Route component={Error}/>
        </Switch>
      </div>
      </>
      </Router>
    )
  }
}

const Parent = render(<App />, document.getElementById("root"));
Parent.forceUpdate()
