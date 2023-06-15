import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMemberById, updateMember } from "../../../../hooks/useMember";

function EditMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [nopol, setNopol] = useState("");
  const [noStnk, setNoStnk] = useState("");
  const [tglExpired, setTglExpired] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["memberById", id],
    queryFn: async () => await getMemberById(id),
  });

  useEffect(() => {
    if (data) {
      setTelepon(data.telepon);
      setNama(data.nama);
      setNopol(data.nopol);
      setNoStnk(data.noStnk);
      setTglExpired(data.tglExpired);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateMember({ id, nama, telepon, nopol, noStnk, tglExpired });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["member"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ id, nama, telepon, nopol, noStnk, tglExpired });
    navigate("/membership");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Data Member</h1>
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
              <label>No Polisi</label>
              <input
                type="text"
                className="form-control"
                value={nopol}
                onChange={(e) => setNopol(e.target.value)}
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
            <div className="form-group">
              <label>No STNK</label>
              <input
                type="text"
                className="form-control"
                value={noStnk}
                onChange={(e) => setNoStnk(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Tanggal Expired Membership</label>
              <input
                type="date"
                className="form-control"
                value={tglExpired}
                onChange={(e) => setTglExpired(e.target.value)}
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

export default EditMember;
