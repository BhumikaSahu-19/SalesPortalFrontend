import React, { useState } from "react";
import axios from "axios";
import "../LoginForm/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://salesportalserver-1.onrender.com/login", { email, password })
      .then((resp) => {
        if (resp.data.message === "SUCCESS") {
          localStorage.setItem("userData", JSON.stringify(resp.data.user));
          navigate("/sales-lead");
        } else {
          setError(resp.data.error || "Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError("Server error. Please try again later.");
      });
  };

  return (
    <div className="body">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h3>Welcome , please login</h3>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="forgot-password">
            <p>
              New user ? <Link to="/register">Register</Link>{" "}
            </p>
          </p>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
