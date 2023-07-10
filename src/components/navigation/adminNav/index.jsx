import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li className="nav-header">MAIN MENU</li>
        <li className="nav-item">
          <Link to={"/kendaraan-masuk"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Kendaraan Masuk</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/kendaraan-keluar"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Kendaraan Keluar</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/transaksi-parkir"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Transaksi Parkir</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/data-member"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Membership</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
