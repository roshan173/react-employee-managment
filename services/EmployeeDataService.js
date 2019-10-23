import React from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/employees";

class EmployeeDataService {
  listAllEmployees() {
    return axios.get(`${API_URL}`);
  }

  retrieveEmployee(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createEmployee(employee) {
    return axios.post(`${API_URL}`, employee);
  }

  updateEmployee(employee, id) {
    return axios.put(`${API_URL}/${id}`, employee);
  }

  deleteEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new EmployeeDataService();
