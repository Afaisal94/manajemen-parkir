import React from "react";
import "./../../../assets/css/all.min.css";
import "./../../../assets/css/adminlte.min.css";
import AdminLTELogo from "./../../../assets/img/AdminLTELogo.png";
import MasterNav from "../../navigation/masterNav";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const MasterLayout = (props) => {
  const navigate = useNavigate();
  const nama = localStorage.getItem("nama");

  const UserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nama");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("posId");
    navigate("/");
  };

  return (
    <>
      <div className="hold-transition sidebar-mini">
        {/* Site wrapper */}
        <div className="wrapper">
          {/* Navbar */}
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="pushmenu"
                  href="#"
                  role="button"
                >
                  <i className="fas fa-bars"></i>
                </a>
              </li>
            </ul>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
              <li>
                <button
                  className="btn btn-secondary"
                  onClick={() => UserLogout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          {/* /.navbar */}

          {/* Main Sidebar Container */}
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            {/* <h2 style="text-shadow: 1px 1px green; text-align: center; padding-top: 20px; padding-bottom: 20px; background-color: white;">PANEL MASTER</h2> */}
            <a href="#" className="brand-link">
              <img
                src={AdminLTELogo}
                alt="AdminLTE Logo"
                className="brand-image img-circle elevation-3"
                style={{ opacity: "0.8" }}
              />
              <span className="brand-text font-weight-light">
                {" "}
                ADMIN MASTER{" "}
              </span>
            </a>

            {/* Sidebar */}
            <div className="sidebar">
              {/* Sidebar user (optional) */}
              <div className="user-panel mt-3 mb-3">
                <center>
                  <p style={{ color: "white" }}>Admin Master</p>
                </center>
              </div>

              {/* Sidebar Menu */}
              <MasterNav />
              {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
          </aside>

          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Here */}
            {props.children}
          </div>
          {/* /.content-wrapper */}

          <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
              <b>Version</b> 1.0.0
            </div>
            <strong>
              Copyright &copy; 2023
              <a href="#">AdminLTE.io</a>.
            </strong>
            All rights reserved.
          </footer>

          {/* Control Sidebar */}
          <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
          </aside>
          {/* /.control-sidebar */}
        </div>
        {/* ./wrapper */}
      </div>
      <Helmet>
        <script
          src="https://adminlte.io/themes/v3/plugins/jquery/jquery.min.js"
          type="text/javascript"
        />
        <script
          src="https://adminlte.io/themes/v3/plugins/bootstrap/js/bootstrap.bundle.min.js"
          type="text/javascript"
        />
        <script
          src="https://adminlte.io/themes/v3/dist/js/adminlte.min.js"
          type="text/javascript"
        />
      </Helmet>
    </>
  );
};

export default MasterLayout;
