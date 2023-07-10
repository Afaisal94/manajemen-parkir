import React from "react";
import { Link } from "react-router-dom";

const MasterNav = () => {
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
          <Link to={"/kendaraan"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Jenis Kendaraan</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/karyawan"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Data Karyawan</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/pos-parkir"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Pos Parkir</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/jadwal-kerja"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Jadwal Kerja</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/data-transaksi"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Data Transaksi</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/membership"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Membership</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/laporan"} className="nav-link">
            <i className="nav-icon fas fa-book"></i>
            <p>Laporan</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MasterNav;
