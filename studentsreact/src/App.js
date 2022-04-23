import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoRegister from './asset/images.png'

function App() {
  
  const baseUrl = "https://localhost:44300/api/Student";

  const [data, setData] = useState([]);

  const[IncludeModal, setIncludeModal]=useState(false);

  const [selectedStudent, setSelectedStudent]=useState({
    id: '',
    name:'',
    email:'',
    age:''
  })

  const openCloseIncludeModal=()=>{
    setIncludeModal(!IncludeModal);
  }

  const handleChange = e=>{
    const {name, value} = e.target;
    setSelectedStudent({
      ...selectedStudent, [name]:value
    });
    console.log(selectedStudent);
  }

  const getRequest = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const postRequest = async()=>{
    delete selectedStudent.id;
    selectedStudent.age=parseInt(selectedStudent.age);
      await axios.post(baseUrl, selectedStudent)
    .then(response=>{
      setData(data.concat(response.data));
      openCloseIncludeModal();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getRequest();
  })

  return (
    <div className="student-container">
      <br/>
      <h3>Students Register</h3>
      <header >
        <img src = {logoRegister} alt='Register'/>
        <button className="btn btn-success" onClick={()=>openCloseIncludeModal()}> Include new student</button>
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

      <Modal isOpen={IncludeModal}>
        <ModalHeader>Inclue student</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name: </label>
            <br/>
            <input type="text" className="form-control" name="name" onChange={handleChange}/>
            <br/>
            <label>Email: </label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange}/>
            <br/>
            <label>Age: </label>
            <br/>
            <input type="text" className="form-control" name="age" onChange={handleChange}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>postRequest()}>Include</button>{"  "}
          <button className="btn btn-danger"  onClick={()=>openCloseIncludeModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
