import './App.css';
import Login from "./components/Login/Login"
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { useAuth } from './Context/AuthProvider';
import Article from './components/Article/Article';
import PharmacyManagement from './components/PharmacyManagement/PharmacyManagement';
import ProfileAdmin from './components/ProfileAdmin/ProfileAdmin';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const { currentUser } = useAuth();


  return <React.Fragment>.-
    <Routes>
      {
        !currentUser ?
          <Route path="/login" element={<Login />} />
          : <Route path="/home" element={<Home />}>
            <Route index element={<Article />} />
            <Route path='/home/pharmacy-management' element={<PharmacyManagement />} />
            <Route path='/home/profile-admin' element={<ProfileAdmin />} />
          </Route>
      }
      <Route path='*' element={<Navigate to={!currentUser ? "/login" : "/home"} replace />} />
    </Routes>
    <ToastContainer
    style={{
      fontSize:'16px',
      color:'black'
    }}
    />
  </React.Fragment>
}


export default App;
