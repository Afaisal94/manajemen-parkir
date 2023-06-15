import React, { useState } from "react";
import { AdminLayout } from "../../../../components";
import { Col, Row } from "react-bootstrap";
import { transaksiOut } from "../../../../hooks/useTransaksi";

function KkManual() {
  const userId = localStorage.getItem("userId");
  const [isForm, setIsForm] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState("");

  const [kendaraanMasuk, setKendaraanMasuk] = useState("");
  const [kendaraanKeluar, setKendaraanKeluar] = useState("");
  const [totalJam, setTotalJam] = useState(0);
  const [totalBiaya, setTotalBiaya] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await transaksiOut({ id, userId })
      .then((res) => {
        console.log(res.data)
        setKendaraanMasuk(res.data.kendaraanMasuk);
        setKendaraanKeluar(res.data.kendaraanKeluar);
        setTotalJam(res.data.totalJam);
        setTotalBiaya(res.data.totalBiaya);
        setIsValid(true);
      })
      .catch((error) => {
        setIsValid(false);
      });
    setIsForm(false);
  };
  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <center>
          <h1 className="mt-4">Kendaraan Keluar</h1>
        </center>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <Row className="justify-content-center">
          {isForm ? (
            <>
              <Col md={5}>
                <div className="card">
                  <div className="card-body">
                    <center>
                      <h2>Input Manual</h2>
                    </center>
                    <br />
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label
                          className="visually-hidden"
                        >
                          Kode Transaksi
                        </label>
                        <div className="input-group">
                          <div className="input-group-text">PARKING-</div>
                          <input
                            type="text"
                            className="form-control"
                            id="autoSizingInputGroup"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <br />
                      <button type="submit" className="btn btn-primary w-100">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col md={5}>
                {isValid ? (
                  <>
                    <div className="alert alert-success" role="alert">
                      <center>
                        <h4>Berhasil Verifikasi Data Transaksi !</h4>
                      </center>
                    </div>
                    <ul>
                      <li>
                        Kendaraan Masuk :{" "}
                        {new Date(kendaraanMasuk).toLocaleString()}{" "}
                      </li>
                      <li>
                        Kendaraan Keluar :{" "}
                        {new Date(kendaraanKeluar).toLocaleString()}{" "}
                      </li>
                      <li>Lama Parkir : {totalJam} Jam </li>
                      <li>Total Biaya : Rp {totalBiaya.toLocaleString()} </li>
                    </ul>
                  </>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    <center>
                      <h4>Gagal Verifikasi Data Transaksi !</h4>
                    </center>
                  </div>
                )}
              </Col>
            </>
          )}
        </Row>
      </div>
    </AdminLayout>
  );
}

export default KkManual;
