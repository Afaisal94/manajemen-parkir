import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getKendaraanById, updateKendaraan } from "../../../../hooks/useKendaraan";

function EditKendaraan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [jenis, setJenis] = useState("");
  const [biaya, setBiaya] = useState("");


  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["kendaraanById", id],
    queryFn: async () => await getKendaraanById(id),
  });

  useEffect(() => {    

    if (data) {
      setJenis(data.jenis);
      setBiaya(data.biaya);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateKendaraan({ id, jenis, biaya });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ id, jenis, biaya });
    navigate("/kendaraan");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Kendaraan</h1>
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
  )
}

export default EditKendaraan