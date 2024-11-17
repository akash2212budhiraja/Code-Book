import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pass, setPass] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    dispatch(login(email, password, navigate));
    console.log("Login attempted with:", { email, password });
  };

  const handleForgotPassword = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // forgotPasswordService.js

  async function sendForgotPasswordRequest(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ forgotEmail }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleModalClose();
        alert(data.message);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        handleModalClose();
        alert("error in sending email");
      }
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      handleModalClose();
      alert("error in sending email");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="logo">
            <span className="icon">🔒</span>
            <h1>Login to CodeBook</h1>
          </div>
          <p className="description">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group" style={{ flex: "row" }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={pass ? "password" : "text"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                style={{
                  marginLeft: "370px",
                  height: "auto",
                  width: "auto",
                  marginTop: "-30px",
                }}
                onClick={() => setPass(!pass)}
              >
                {!pass ? (
                  <FaEye
                    style={{ height: "20px", width: "20px", color: "black" }}
                  />
                ) : (
                  <FaEyeSlash
                    style={{ height: "20px", width: "20px", color: "black" }}
                  />
                )}
              </div>
            </div>
            {error && <div className="error-alert">{error}</div>}
            <button type="submit" className="login-button">
              Log In <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="login-button"
            >
              Forgot Password <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Signup</a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              <RxCross2 />
            </span>
            <h2 style={{ fontWeight: "700" }}>Reset Password</h2>
            <form onSubmit={sendForgotPasswordRequest}>
              <div className="input-group">
                <label htmlFor="forgotEmail">Email</label>
                <input
                  id="forgotEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
