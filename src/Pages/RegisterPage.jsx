import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  let [fname, setFname] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [Cpassword, setCpassword] = useState("");
  let navigate = useNavigate();

  let [errorMessage, setErrorMessage] = useState("");

  let [fnameError, setFnameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [passError, setPassError] = useState("");
  let [CpassError, setCpassError] = useState("");

  let formHandle = (e) => {
    e.preventDefault();
    console.log(fname, email, password, Cpassword);

    if (!fname) {
      setFnameError("First-Name is required");
    } else {
      setFnameError("");
    }
    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    if (!password) {
      setPassError("Password is required");
    } else {
      setPassError("");
    }
    if (password) {
      if (password !== Cpassword) {
        setCpassError("Password did not match");
      } else if (!Cpassword) {
        setCpassError("Confirm Password is required");
      } else {
        setCpassError("");
      }
    }

    if (fname && email && password && password === Cpassword) {
      let formData = {
        leadFirstName: fname,
        leadEmail: email,
        leadPassword: password,
      };
      axios
        .post("https://salesportalserver-1.onrender.com/register", formData)
        .then((resp) => {
          if (resp.data === "email id is already registered") {
            setErrorMessage("Email id is already registered");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={formHandle}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="fname">Full Name:</label>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          {fnameError && <p className="error">{fnameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passError && <p className="error">{passError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="Cpassword">Confirm Password:</label>
          <input
            type="password"
            id="Cpassword"
            value={Cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          {CpassError && <p className="error">{CpassError}</p>}
        </div>
        
        <button type="submit" className="register-button">
          Register
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Already a user? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default RegisterPage;

