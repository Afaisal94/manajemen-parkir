import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJadwalKerja, updateJadwalKerja } from "../../../../hooks/useJadwalKerja";

function EditJadwal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [seninPagi, setSeninPagi] = useState("");
  const [seninSore, setSeninSore] = useState("");
  const [selasaPagi, setSelasaPagi] = useState("");
  const [selasaSore, setSelasaSore] = useState("");
  const [rabuPagi, setRabuPagi] = useState("");
  const [rabuSore, setRabuSore] = useState("");
  const [kamisPagi, setKamisPagi] = useState("");
  const [kamisSore, setKamisSore] = useState("");
  const [jumatPagi, setJumatPagi] = useState("");
  const [jumatSore, setJumatSore] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["jadwalkerja"],
    queryFn: getJadwalKerja,
  });

  useEffect(() => {    
    if (data) {
      setBulan(data.bulan);
      setTahun(data.tahun);
      setSeninPagi(data.seninPagi)
      setSeninSore(data.seninSore)
      setSelasaPagi(data.selasaPagi)
      setSelasaSore(data.selasaSore)
      setRabuPagi(data.rabuPagi)
      setRabuSore(data.rabuSore)
      setKamisPagi(data.kamisPagi)
      setKamisSore(data.kamisSore)
      setJumatPagi(data.jumatPagi)
      setJumatSore(data.jumatSore)
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await updateJadwalKerja({ bulan, tahun, seninPagi, seninSore, selasaPagi, selasaSore, rabuPagi, rabuSore, kamisPagi, kamisSore, jumatPagi, jumatSore });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jadwalkerja"] });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate({ bulan, tahun, seninPagi, seninSore, selasaPagi, selasaSore, rabuPagi, rabuSore, kamisPagi, kamisSore, jumatPagi, jumatSore });
    navigate("/jadwal-kerja");
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Jadwal Kerja</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Bulan</label>
              <input
                type="text"
                className="form-control"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Tahun</label>
              <input
                type="number"
                className="form-control"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Senin Pagi</label>
              <input
                type="text"
                className="form-control"
                value={seninPagi}
                onChange={(e) => setSeninPagi(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Senin Sore</label>
              <input
                type="text"
                className="form-control"
                value={seninSore}
                onChange={(e) => setSeninSore(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Selasa Pagi</label>
              <input
                type="text"
                className="form-control"
                value={selasaPagi}
                onChange={(e) => setSelasaPagi(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Selasa Sore</label>
              <input
                type="text"
                className="form-control"
                value={selasaSore}
                onChange={(e) => setSelasaSore(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Rabu Pagi</label>
              <input
                type="text"
                className="form-control"
                value={rabuPagi}
                onChange={(e) => setRabuPagi(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Rabu Sore</label>
              <input
                type="text"
                className="form-control"
                value={rabuSore}
                onChange={(e) => setRabuSore(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Kamis Pagi</label>
              <input
                type="text"
                className="form-control"
                value={kamisPagi}
                onChange={(e) => setKamisPagi(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Kamis Sore</label>
              <input
                type="text"
                className="form-control"
                value={kamisSore}
                onChange={(e) => setKamisSore(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Jumat pagi</label>
              <input
                type="text"
                className="form-control"
                value={jumatPagi}
                onChange={(e) => setJumatPagi(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Jumat Sore</label>
              <input
                type="text"
                className="form-control"
                value={jumatSore}
                onChange={(e) => setJumatSore(e.target.value)}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </MasterLayout>
  )
}

export default EditJadwal