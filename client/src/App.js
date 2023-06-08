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
import {DASHBOARD_HREF, HOST_PATH, SIGNUP_HREF,LOGIN_HREF} from './constants/constants';
const App = () => {
  const makeAPICall = async () => {
    try {
      const response = await axios.get(HOST_PATH, {mode:'cors'});
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
        <Route path={SIGNUP_HREF} element={<SignUp/>} />
        <Route path={LOGIN_HREF} element={<Login/>}/>
        <Route path={DASHBOARD_HREF} element={<Dashboard/>}/>
      </Routes>
    </Router>);
};

export default App;
