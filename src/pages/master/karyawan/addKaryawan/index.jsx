import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKaryawan } from "../../../../hooks/useKaryawan";

function AddKaryawan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [telepon, setTelepon] = useState("");
  const [role, setRole] = useState("admin");

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createKaryawan({ email, password, nama, nik, telepon, role });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["karyawan"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ email, password, nama, nik, telepon, role });
    navigate("/karyawan");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Tambah Data Karyawan</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama</label>
              <input
                type="text"
                className="form-control"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>NIK</label>
              <input
                type="text"
                className="form-control"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>No Telepon</label>
              <input
                type="text"
                className="form-control"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </MasterLayout>
  );
}

export default AddKaryawan;
