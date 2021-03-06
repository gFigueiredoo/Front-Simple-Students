import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoRegister from './asset/images.png'

function App() {
  
  const baseUrl = "https://localhost:44300/api/Student";

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [IncludeModal, setIncludeModal]=useState(false);
  const [EditModal, setEditModal]=useState(false);
  const [RemoveModal, setRemoveModal]=useState(false);
  
  const [selectedStudent, setSelectedStudent]=useState({
    id: '',
    name:'',
    email:'',
    age:''
  })

  const selectStudent = (student, option) => {
    setSelectedStudent(student);
    (option === "Edit") 
    ? openCloseEditModal()
    : openCloseRemoveModal();
  }
  const openCloseIncludeModal=()=>{
    setIncludeModal(!IncludeModal);
  }

  const openCloseEditModal=()=>{
    setEditModal(!EditModal);
  }

  const openCloseRemoveModal=()=>{
    setRemoveModal(!RemoveModal);
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
      setUpdateData(true);

    }).catch(error=>{
      console.log(error);
    })
  }

  const putRequest = async()=>{
    selectedStudent.age = parseInt(selectedStudent.age);
    await axios.put(baseUrl+"/"+selectedStudent.id, selectedStudent)
    .then(response =>{
      var resposta = response.data;
      var dataAux = data;
      dataAux.map(student =>{
        if (student.id === selectedStudent.id){
            student.name  = resposta.name;
            student.email = resposta.email;
            student.age   = resposta.age;
        }
      });
      
      setUpdateData(true);
      openCloseEditModal();

    }).catch(error =>{
      console.log(error);
    })
  }

  const removeRequest = async()=>{
    await axios.delete(baseUrl+"/"+selectedStudent.id)
    .then(response=>{
        setData(data.filter(student => student.id !== response.data));
        setUpdateData(true);
        openCloseRemoveModal();

    }).catch(error =>{
      console.log (error)
    })
  }

  useEffect(()=>{
    if (updateData){
      getRequest();
      setUpdateData(false);
    }
  }, [updateData])

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
                <button className="btn btn-primary" onClick={()=>selectStudent(student, "Edit")}>Edit</button> {"  "}
                <button className="btn btn-danger"  onClick={()=>selectStudent(student, "Remove")}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={IncludeModal}>
        <ModalHeader>Include student</ModalHeader>
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

      <Modal isOpen={EditModal}>
        <ModalHeader>Edit student</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <input type = "text" className = "form-control" readOnly
            value = {selectedStudent && selectedStudent.id}/>
            <br/>
            <label>Name: </label>
            <br/>
            <input type="text" className="form-control" name="name" onChange={handleChange}
            value = {selectedStudent && selectedStudent.name}/>
            <br/>
            <label>Email: </label>
            <br/>
            <input type="text" className="form-control" name="email" onChange={handleChange}
            value = {selectedStudent && selectedStudent.email}/>
            <br/>
            <label>Age: </label>
            <br/>
            <input type="text" className="form-control" name="age" onChange={handleChange}
            value = {selectedStudent && selectedStudent.age}/>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>putRequest()}>Edit</button>{"  "}
          <button className="btn btn-danger"  onClick={()=>openCloseEditModal()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={RemoveModal}>
        <ModalBody>
            Confirm the exclusion of student: {selectedStudent && selectedStudent.name}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>removeRequest()}>Yes</button>
          <button className="btn btn-danger"  onClick={()=>openCloseRemoveModal()}>No</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
