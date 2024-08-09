import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/LoginRegister/Login';
import { Register } from './components/LoginRegister/Register';
import { ReimContainer } from './components/Reimbursement/ReimContainer';
import { UsersContainer } from './components/User/UsersContainer';
import { AddReim } from './components/Reimbursement/AddReim';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/reim" element={<ReimContainer/>}/>
          <Route path="/users" element={<UsersContainer/>}></Route>
          <Route path="/addReim" element={<AddReim/>}></Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
