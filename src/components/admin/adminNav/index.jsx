import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>
            <div className="sb-sidenav-menu-heading">Main Menu</div>
            <Link to={'/kendaraan-masuk'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Kendaraan Masuk
            </Link>
            <Link to={'/kendaraan-keluar'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Kendaraan Keluar
            </Link>
            <Link to={'/transaksi-parkir'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Transaksi Parkir
            </Link>
            <Link to={'/data-member'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Membership
            </Link>
        </div>
    </div>
  )
}

export default AdminNav