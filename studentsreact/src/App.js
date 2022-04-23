import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFlooter, ModalHeader} from 'reactstrap';
import logoRegister from './asset/images.png'

function App() {
  
  const baseUrl = "https://localhost:44300/api/Student";
  const [data, setData] = useState([]);

  const getRequest = async() =>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() =>{
    getRequest();
  })

  return (
    <div className="student-container">
      <br/>
      <h3>Students Register</h3>
      <header >
        <img src = {logoRegister} alt='Register'/>
        <button className="btn btn-success"> Include new student</button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student =>(
            <tr key = {student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button className="btn btn-primary">Edit</button> {"  "}
                <button className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
