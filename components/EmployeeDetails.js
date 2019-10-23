import React, { Component } from "react";
import "../style.css";
import EmployeeDataService from "../services/EmployeeDataService";

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: ""
    };
    this.refreshEmployeeDetails = this.refreshEmployeeDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.state.id == -1) {
      return;
    }
    EmployeeDataService.retrieveEmployee(this.state.id).then(response => {
      this.refreshEmployeeDetails(response.data);
    });
  }

  refreshEmployeeDetails(data) {
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId
    });
  }

  handleSubmit(event) {
    if (this.state.id == -1) {
      EmployeeDataService.createEmployee(this.state);
    } else {
      EmployeeDataService.updateEmployee(this.state, this.state.id);
    }
    const { history } = this.props;
    if (history) history.push(`/employees`);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    console.log(target);
    this.setState({
      [name]: target.value
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>Employee Details</h3>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <fieldset className="form-group">
              <label>Id</label>
              <input
                className="form-control"
                type="text"
                defaultValue={this.state.id}
                disabled
              />
            </fieldset>
            <fieldset className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                defaultValue={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                defaultValue={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label>Email Id</label>
              <input
                className="form-control"
                type="text"
                name="emailId"
                defaultValue={this.state.emailId}
                onChange={this.handleInputChange}
              />
            </fieldset>
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeDetails;
