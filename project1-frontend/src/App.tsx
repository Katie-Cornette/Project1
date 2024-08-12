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
import { PendingReim } from './components/Reimbursement/PendingReim';
import { PendingReimContainer } from './components/Reimbursement/PendingReimContainer';
import { ApprovedReim } from './components/Reimbursement/ApprovedReim';
import { ApprovedReimContainer } from './components/Reimbursement/ApprovedReimContainer';
import { DeniedReimContainer } from './components/Reimbursement/DeniedReimContainer';
import { AllReimContainer } from './components/Reimbursement/AllReimContainer';
import { AllPendingReimContainer } from './components/Reimbursement/AllPendingReimContainer';
import { AllApprovedReimContainer } from './components/Reimbursement/AllApprovedReimContainer';
import { AllDeniedReimContainer } from './components/Reimbursement/AllDeniedReimContainer';
import { Profile } from './components/User/Profile';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter >
        <Routes>
          <Route path="" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/reim" element={<ReimContainer/>}/>
          <Route path="/users" element={<UsersContainer/>}></Route>
          <Route path="/addReim" element={<AddReim/>}></Route>
          <Route path="/pendingReim" element={<PendingReimContainer/>}></Route>
          <Route path="/approvedReim" element={<ApprovedReimContainer/>}></Route>
          <Route path="/deniedReim" element={<DeniedReimContainer/>}></Route>
          <Route path="/allReim" element={<AllReimContainer/>}></Route>
          <Route path ="/allPending" element = {<AllPendingReimContainer/>}></Route>
          <Route path ="/allApproved" element = {<AllApprovedReimContainer/>}></Route>
          <Route path="/allDenied" element = {<AllDeniedReimContainer/>}></Route>
          <Route path="/profile" element = {<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
