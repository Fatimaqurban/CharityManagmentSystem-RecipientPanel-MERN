import login_logo from "../Images/login_logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3003/recipient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Display an error message for incorrect email or password
        setErrorMessage("Incorrect email or password");
        return;
      }
      const data = await response.json();

      if (data.status === "success" && data.token) {
        // Log the token to the console
        console.log("Token:", data.token);

        // Store the token in local storage
        localStorage.setItem("token", data.token);

        navigate("/fetchAllDonor");
      } else {
        // Handle authentication failure
        throw new Error("Authentication failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <section className="background3">
      <div className="container-fluid">
        <img
          src={login_logo}
          className="center"
          style={{ height: "7%", width: "7%", paddingTop: "5%" }}
          alt=""
        />
      </div>
      <h5 className="mt-4 text-center text-white mb-2">User Login</h5>

      {/* login section */}
      <div className="left mt-0">
        <div className="contact">
          <form>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "white", "::placeholder": { color: "grey" } }}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ color: "white", "::placeholder": { color: "grey" } }}
            />
            <div>
              {errorMessage && (
                <p className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
        <button
          className="btn_bg center"
          style={{ marginTop: "10px", width: "200px" }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      <div className="row mt-5">
        <div className="col-lg-6 col-md-6"></div>
        <div className="col-lg-6 col-md-6">
          <div className="row">
            <div className="col-lg-3 col-md-3 mb-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
