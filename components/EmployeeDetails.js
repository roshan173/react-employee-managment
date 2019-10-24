import React, { Component } from "react";
import "../style.css";
import EmployeeDataService from "../services/EmployeeDataService";
import Employee from "./Employee";

class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
      errors: {
        firstName: "",
        lastName: "",
        emailId: ""
      }
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
    event.preventDefault();
    if (!this.validateForm(this.state.errors)) {
      console.info("Invalid Form");
      return;
    }
    if (this.state.id == -1) {
      if(this.state.firstName && this.state.lastName && this.state.emailId){
        EmployeeDataService.createEmployee(this.state);
      } else {
        return
      }
      
    } else {
      EmployeeDataService.updateEmployee(this.state, this.state.id);
    }
    const { history } = this.props;
    if (history) {
      history.push(`/employees`);
    }
  }

  handleInputChange(event) {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 3 ? "First Name must be 5 characters long!" : "";
        break;
      case "lastName":
        errors.lastName =
          value.length < 3 ? "Last Name must be 5 characters long!" : "";
        break;
      case "emailId":
        errors.emailId = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      default:
        break;
    }
    this.setState(
      {
        errors,
        [name]: value
      },
      () => {
        console.log(errors);
      }
    );
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  }

  render() {
    console.log(this.state);
    const { errors } = this.state;
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
              {errors.firstName.length > 0 && (
                <span className="error">{errors.firstName}</span>
              )}
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
              {errors.lastName.length > 0 && (
                <span className="error">{errors.lastName}</span>
              )}
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
              {errors.emailId.length > 0 && (
                <span className="error">{errors.emailId}</span>
              )}
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
