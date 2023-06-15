import React from 'react'
import { Link } from 'react-router-dom'

const MasterNav = () => {
  return (
    <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>
                                   
            <div className="sb-sidenav-menu-heading">Main Menu</div>
            <Link to={'/kendaraan'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Jenis Kendaraan</h6>
            </Link>
            <Link to={'/karyawan'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Data Karyawan</h6>
            </Link>
            <Link to={'/pos-parkir'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Pos Parkir</h6>
            </Link>
            <Link to={'/jadwal-kerja'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Jadwal Kerja</h6>
            </Link>
            <Link to={'/data-transaksi'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Data Transaksi</h6>
            </Link>
            <Link to={'/membership'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Membership</h6>
            </Link>
            <Link to={'/laporan'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                <h6>Laporan</h6>
            </Link>
        </div>
    </div>
  )
}

export default MasterNav