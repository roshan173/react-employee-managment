import React, { Component } from 'react'
import EmployeeDataService from '../services/EmployeeDataService'
import '../style.css'

class Employee extends Component{

  constructor(){
    this.state = {
      employees : []
    }
    this.refreshEmployees = this.refreshEmployees.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
  }

  componentDidMount() {
    this.refreshEmployees()
  }

  refreshEmployees(){
    EmployeeDataService.listAllEmployees()
      .then(
        response => {
          this.setState({
            employees: response.data
          })
        }
      )
  }

  deleteEmployee(id) {
    EmployeeDataService.deleteEmployee(id)
    .then(
        response => {
          this.refreshEmployees()
        }
    )
  }

  updateEmployee(id) {
   const {history} = this.props
   if(history) history.push(`/employees/${id}`)
  }

  addEmployee() {
   const {history} = this.props
   if(history) history.push(`/employees/-1`)
  }

  render() {
    return(
      <div className='container'>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.employees.map(
                employee => 
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.emailId}</td>
                    <td><button className="btn btn-warning" onClick={()=> this.deleteEmployee(employee.id)}>Delete</button></td>
                    <td><button className="btn btn-success" onClick={ () => this.updateEmployee(employee.id)}>Update</button></td>
                  </tr>
              )
            }
          </tbody>
        </table>
        <button className="btn btn-success" onClick={ () => this.addEmployee()}>Add Employee</button>
      </div>
    )
  }
}

export default Employee