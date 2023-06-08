import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';
import {useEffect} from 'react';
import axios from 'axios';
const App = () => {
  const makeAPICall = async () => {
    try {
      const response = await axios.get('http://localhost:5000/', {mode:'cors'});
      const data = response.data;
      console.log({ data });
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
  return (
    <Router>
        <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>);
};

export default App;
