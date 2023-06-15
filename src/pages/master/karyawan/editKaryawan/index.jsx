import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getKaryawanById, updateKaryawan } from "../../../../hooks/useKaryawan";

function EditKaryawan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [telepon, setTelepon] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["karyawanById", id],
    queryFn: async () => await getKaryawanById(id),
  });

  useEffect(() => {
    if (data) {
      setEmail(data.email);
      setNama(data.nama);
      setNik(data.nik);
      setTelepon(data.telepon);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateKaryawan({ id, email, nama, nik, telepon });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["karyawan"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ id, email, nama, nik, telepon });
    navigate("/karyawan");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Data Karyawan</h1>
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

export default EditKaryawan;
