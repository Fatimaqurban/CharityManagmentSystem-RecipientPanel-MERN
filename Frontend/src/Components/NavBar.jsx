import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/logo.png";
import "../App.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
const NavBar = (props) => {
  const location = useLocation();

  // Check if the current location is the home or login page
  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const isLoggedIn = location.pathname === "/fetchAllDonor";
  const isProfile = location.pathname === "/recipientPortal";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch {
      console.log("Error logging out");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar_bg">
        <div className="container-fluid m-0 me-5">
          <Link to="/">
            <img src={logo} alt="" width="7%" height="7%" />
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mb-lg-0">
            <div
              className="nav-item ms-2 me-2"
              style={{
                textDecoration: "none",
                color: "black",
                background: "transparent",
              }}
            >
              <Link
                className="text-center btn-link"
                style={{ textDecoration: "none", color: "black" }}
                to="/"
              >
                {" "}
                Home
              </Link>
            </div>

            {/* <div className="nav-item ms-2 me-2">
              <button
                className="text-center btn-link"
                style={{
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                  background: "transparent",
                }}
                onClick={() => {}}
              >
                Achievements
              </button>
            </div>
            <div className="nav-item ms-2 me-2">
              <button
                className="text-center btn-link"
                style={{
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                  background: "transparent",
                }}
                onClick={() => {}}
              >
              Help
              </button>
            </div> */}
          </div>
        </div>

        {isHome || isLogin || isLoggedIn || isProfile ? (
          <>
            {isLoggedIn || isProfile ? (
              // Render elements for logged-in users
              <>
                <div className="ms-3 me-3">
                  <Link to="/fetchAllDonor">
                    <button
                      className="btn_bg text"
                      style={{ padding: "5% 10% 5% 10%", borderRadius: "20px" }}
                    >
                      <HomeIcon />
                    </button>
                  </Link>
                </div>
                <div className="ms-3 me-3">
                  <Link to="/recipientPortal">
                    <button
                      className="btn_bg text"
                      style={{ padding: "5% 10% 5% 10%", borderRadius: "20px" }}
                    >
                      <PersonIcon />
                    </button>
                  </Link>
                </div>
                <div className="ms-3 me-4" style={{ padding: "5px" }}>
                  <button
                    onClick={handleLogout}
                    className="btn_bg text"
                    style={{ padding: "5% 10% 10% 20%", borderRadius: "15px" }}
                  >
                    <LogoutIcon />
                  </button>
                </div>
              </>
            ) : (
              <>
                {isLogin ? (
                  <div className="ms-5 me-5">
                    <Link to="/register">
                      <button
                        className="btn_bg text"
                        style={{ padding: "5% 10% 5% 10%" }}
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="ms-4 me-5">
                      <Link to="/login">
                        <button
                          className="btn_bg text"
                          style={{ padding: "7% 10% 7% 10%" }}
                        >
                          Login
                        </button>
                      </Link>
                    </div>
                    <div className="me-5">
                      <Link to="/register">
                        <button
                          className="btn_bg text me-4"
                          style={{ padding: "5% 10% 5% 10%" }}
                        >
                          Register
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="ms-4 me-5">
              <Link to="/login">
                <button
                  className="btn_bg text"
                  style={{ padding: "7% 10% 7% 10%" }}
                >
                  Login
                </button>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
