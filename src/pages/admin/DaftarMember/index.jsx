import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
function DaftarMember() {
  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Daftar Member</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row"></div>
      </div>
    </AdminLayout>
  );
}

export default DaftarMember;
