import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './login.css';
import { db } from "./Firebase/firebase";
import 'firebase/auth';


const LoginPage = ({ onLogin }) => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(email, password);
    };


  return (




<div id="main">

<h1 id="heading">Certified Buy</h1>


<div id="login-page">

    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Admin Login</h3>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  </div>
);
};


export default LoginPage;
