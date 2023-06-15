import React, { useEffect, useState, useRef } from "react";
import { Laporan, MasterLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import {
  getLaporanHarian,
  getLaporanBulanan,
  getLaporanTahunan,
} from "../../../../hooks/useLaporan";
import ReactToPrint from "react-to-print";

function ListLaporan() {
  const navigate = useNavigate();
  const componentRef = useRef();
  const [dataHarian, setDataHarian] = useState([]);
  const [dataBulanan, setDataBulanan] = useState([]);
  const [dataTahunan, setDataTahunan] = useState([]);

  const [filterHarian, setFilterHarian] = useState(false);
  const [filterBulanan, setFilterBulanan] = useState(false);
  const [filterTahunan, setFilterTahunan] = useState(false);

  const [laporanHarian, setLaporanHarian] = useState(false);
  const [laporanBulanan, setLaporanBulanan] = useState(false);
  const [laporanTahunan, setLaporanTahunan] = useState(false);

  // FILTER HARIAN
  const [awal, setAwal] = useState("");
  const [akhir, setAkhir] = useState("");
  const HandleSubmitHarian = async (event) => {
    event.preventDefault();
    // console.log(awal);
    // console.log(akhir);
    getLaporanHarian({ awal, akhir }).then((res) => {
      console.log(res);
      setDataHarian(res);
      setLaporanHarian(true);
    });
  };

  // FILTER BULANAN
  const [bulan, setBulan] = useState("");
  const HandleSubmitBulanan = async (event) => {
    event.preventDefault();
    getLaporanBulanan({ bulan }).then((res) => {
      console.log(res);
      setDataBulanan(res);
      setLaporanBulanan(true);
    });
  };

  // FILTER TAHUNAN
  const [tahun, setTahun] = useState("");
  const HandleSubmitTahunan = async (event) => {
    event.preventDefault();
    getLaporanTahunan({ tahun }).then((res) => {
      console.log(res);
      setDataTahunan(res);
      setLaporanTahunan(true);
    });
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Laporan</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active"></li>
        </ol>
        <div className="row">
          <center>
            <h4 className="mb-5">Pilih Jenis Laporan</h4>
          </center>
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>
                  <center>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setFilterHarian(true);
                        setFilterBulanan(false);
                        setFilterTahunan(false);
                        setLaporanHarian(false);
                        setLaporanBulanan(false);
                        setLaporanTahunan(false);
                      }}
                    >
                      Laporan Harian
                    </button>
                  </center>
                </th>
                <th>
                  <center>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setFilterHarian(false);
                        setFilterBulanan(true);
                        setFilterTahunan(false);
                        setLaporanHarian(false);
                        setLaporanBulanan(false);
                        setLaporanTahunan(false);
                      }}
                    >
                      Laporan Bulanan
                    </button>
                  </center>
                </th>
                <th>
                  <center>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setFilterHarian(false);
                        setFilterBulanan(false);
                        setFilterTahunan(true);
                        setLaporanHarian(false);
                        setLaporanBulanan(false);
                        setLaporanTahunan(false);
                      }}
                    >
                      Laporan Tahunan
                    </button>
                  </center>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="row justify-content-md-center mt-5">
          {/* Filter Harian   */}
          {filterHarian ? (
            <div className="col-md-6">
              <center>
                <h2>Laporan Harian</h2>
              </center>
              <form onSubmit={HandleSubmitHarian}>
                <div className="form-group">
                  <label>Tanggal Awal</label>
                  <input
                    type="date"
                    className="form-control"
                    value={awal}
                    onChange={(e) => setAwal(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Tanggal Akhir</label>
                  <input
                    type="date"
                    className="form-control"
                    value={akhir}
                    onChange={(e) => setAkhir(e.target.value)}
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <br />
            </div>
          ) : null}

          {laporanHarian ? (
            <>
              <center>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-success btn-lg">
                      Download Laporan Harian
                    </button>
                  )}
                  content={() => componentRef.current}
                />
              </center>
              <div style={{ display: "none" }}>
                <Laporan
                  pdfRef={componentRef}
                  data={dataHarian}
                  judul={"Laporan Harian"}
                />
              </div>
            </>
          ) : null}

          {/* Filter Bulanan   */}
          {filterBulanan ? (
            <div className="col-md-6">
              <center>
                <h2>Laporan Bulanan</h2>
              </center>
              <form onSubmit={HandleSubmitBulanan}>
                <div className="form-group">
                  <label>Pilih Bulan</label>
                  <select
                    className="form-control"
                    onChange={(e) => setBulan(e.target.value)}
                  >
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
                  </select>
                </div>
                <br />

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <br />
            </div>
          ) : null}

          {laporanBulanan ? (
            <>
              <center>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-success btn-lg">
                      Download Laporan Bulanan
                    </button>
                  )}
                  content={() => componentRef.current}
                />
              </center>
              <div style={{ display: "none" }}>
                <Laporan
                  pdfRef={componentRef}
                  data={dataBulanan}
                  judul={"Laporan Bulanan"}
                />
              </div>
            </>
          ) : null}

          {/* Filter Tahunan   */}
          {filterTahunan ? (
            <div className="col-md-6">
              <center>
                <h2>Laporan Tahunan</h2>
              </center>
              <form onSubmit={HandleSubmitTahunan}>
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

                <br />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <br />
            </div>
          ) : null}

          {laporanTahunan ? (
            <>
              <center>
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-success btn-lg">
                      Download Laporan Tahunan
                    </button>
                  )}
                  content={() => componentRef.current}
                />
              </center>
              <div style={{ display: "none" }}>
                <Laporan
                  pdfRef={componentRef}
                  data={dataTahunan}
                  judul={"Laporan Tahunan"}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </MasterLayout>
  );
}

export default ListLaporan;
