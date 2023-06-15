import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPos } from "../../../../hooks/usePos";
import { getKendaraan } from "../../../../hooks/useKendaraan";

function AddPos() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [nama, setNama] = useState("");
  const [kendaraanId, setKendaraanId] = useState("");

  const { isLoading, data : kendaraan } = useQuery({
    queryKey: ["kendaraan"],
    queryFn: getKendaraan,
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createPos({ nama, kendaraanId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pos"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ nama, kendaraanId });
    navigate("/pos-parkir");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Tambah Pos Parkir</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama Pos Parkir</label>
              <input
                type="text"
                className="form-control"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Jenis Kendaraan</label>
              <select
                className="form-control"
                onChange={(e) => setKendaraanId(e.target.value)}
              >
                <option value="">- Pilih Jenis Kendaraan -</option>
                {!isLoading && kendaraan.length ? (
                  <>
                    {kendaraan.map((item) => (
                      <option value={item.id}>{item.jenis}</option>
                    ))}
                  </>
                ) : null}
              </select>
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

export default AddPos;
