import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createKendaraan } from "../../../../hooks/useKendaraan";

function AddKendaraan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [jenis, setJenis] = useState("");
  const [biaya, setBiaya] = useState("");

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createKendaraan({ jenis, biaya });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ jenis, biaya });
    navigate("/kendaraan");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Tambah Kendaraan</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Jenis Kendaraan</label>
              <input
                type="text"
                className="form-control"
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Biaya</label>
              <input
                type="number"
                className="form-control"
                value={biaya}
                onChange={(e) => setBiaya(e.target.value)}
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

export default AddKendaraan;
