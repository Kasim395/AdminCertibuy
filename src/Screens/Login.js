import React, { useState } from 'react';

import { auth} from "./Firebase/firebase";

import './login.css';

import { CDBTable , CDBBtn} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useHistory } from 'react-router-dom';


import CertifiedBuy from "./CertifiedBuy.png"

const LoginPage = ({ onLogin }) => {

    
    const [email, setEmail] = useState(' ');
    const [email2, setEmail2] = useState(' ');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleEmailChange = (e) => {
      
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    console.log(email)
  
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!email) {
        alert("Please recheck the email.");
      }

      if (password.length < 8) {
        alert("Please recheck the password.");
        return;
      }
    
      onLogin(email, password);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };


    const handleForgotPassword = async () => {
      try {
        await auth.sendPasswordResetEmail(email2);
        console.log("Password reset email sent successfully");
        // Display a success message or redirect the user to a confirmation page
      } catch (error) {
        console.log("Error sending password reset email:", error.message);
        // Display an error message to the user
      }
    };

//<h1 id="heading">Certified Buy</h1>


const handleSwitchToInspector = () => {
  window.location.assign('/inspector');
};

  return (

<div id="main">
<img id='pix' src={CertifiedBuy} alt="My Image" />

<div id="login-page" >

<div id='myforms'>

    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Admin Login</h3>
      <div className="form-group">
        <label htmlFor="email">Email:</label>




        <input
          id="email"
          type='email'
          value={email}
          onChange={handleEmailChange}
        placeholder='Enter Your Email'
          
          //required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>

        <input
  type={showPassword ? "text" : "password"}
  id="password"
  value={password}
  onChange={handlePasswordChange}
  placeholder="Enter your password"
  required
/>

      </div>
      
      <button type="button" onClick={togglePasswordVisibility}>
  {showPassword ? "Hide" : "Show"} Password
</button>
      <CDBBtn type='submit'> Login</CDBBtn>
    </form>

    <div>
      {showResetPassword ? (
        <div style={{ paddingTop: "20px" }}>
          <input
            type="email"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
            placeholder="Enter email for reset"
            required
          />
          <button onClick={handleForgotPassword}>Reset Password</button>
          <button onClick={() => setShowResetPassword(false)}>Cancel</button>
        </div>
      ) : (
        <p>
          <a href="#" onClick={() => setShowResetPassword(true)}>
            Forgot Password?
          </a>
        </p>
      )}
    </div>
   

  </div>

<CDBBtn onClick={handleSwitchToInspector} style={{width:'100%', background:'#5065A8'}}  >Switch To Inspector Login</CDBBtn>
 
 

 
  </div>
  </div>
);
};


export default LoginPage;
