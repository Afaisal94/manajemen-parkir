import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import {
  getTransaksi,
  getTransaksiByDateRange,
  getTransaksiByStatus,
  getTransaksiByPosId,
  deleteTransaksi,
} from "../../../../hooks/useTransaksi";
import { getPos } from "../../../../hooks/usePos";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ListTransaksi() {
  const navigate = useNavigate();
  const [dataPos, setDataPos] = useState([]);
  const [dataTrans, setDataTrans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getTransaksi()
      .then((res) => {
        console.log(res);
        setDataTrans(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      });
    getPos().then((res) => {
      console.log(res);
      setDataPos(res);
    });
  }, []);

  const HandleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  // Modal Filter By Date
  const [showByDate, setShowByDate] = useState(false);
  const handleCloseByDate = () => setShowByDate(false);
  const handleShowByDate = () => setShowByDate(true);
  const [awal, setAwal] = useState("");
  const [akhir, setAkhir] = useState("");
  const HandleFilterDate = async (event) => {
    event.preventDefault();
    console.log(awal);
    console.log(akhir);
    getTransaksiByDateRange({ awal, akhir })
      .then((res) => {
        console.log(res);
        setDataTrans(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      });
    setShowByDate(false);
  };

  // Modal Filter By Pos
  const [showByPos, setShowByPos] = useState(false);
  const handleCloseByPos = () => setShowByPos(false);
  const handleShowByPos = () => setShowByPos(true);
  const [posId, setposId] = useState("");
  const HandleFilterPos = async (event) => {
    event.preventDefault();
    console.log(posId);
    getTransaksiByPosId({ posId })
      .then((res) => {
        console.log(res);
        setDataTrans(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      });
    setShowByPos(false);
  };

  // Modal Filter By Status
  const [showByStatus, setShowByStatus] = useState(false);
  const handleCloseByStatus = () => setShowByStatus(false);
  const handleShowByStatus = () => setShowByStatus(true);
  const [status, setStatus] = useState("");
  const HandleFilterStatus = async (event) => {
    event.preventDefault();
    console.log(status);
    getTransaksiByStatus({ status })
      .then((res) => {
        console.log(res);
        setDataTrans(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error.message);
      });
    setShowByStatus(false);
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Data Transaksi</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Button className="btn btn-primary m-2" onClick={handleShowByDate}>
              Filter By Date
            </Button>
            <Button className="btn btn-primary m-2" onClick={handleShowByPos}>
              Filter By Pos
            </Button>
            <Button
              className="btn btn-primary m-2"
              onClick={handleShowByStatus}
            >
              Filter By Status
            </Button>
          </li>
        </ol>
        {/* Modal By Date */}
        <Modal show={showByDate} onHide={handleCloseByDate}>
          <Modal.Header closeButton>
            <Modal.Title>Filter By Date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={HandleFilterDate}>
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
          </Modal.Body>
        </Modal>

        {/* Modal By Pos */}
        <Modal show={showByPos} onHide={handleCloseByPos}>
          <Modal.Header closeButton>
            <Modal.Title>Filter By Pos Parkir</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={HandleFilterPos}>
              <div className="form-group">
                <label>Nama Pos</label>
                <select
                  className="form-control"
                  onChange={(e) => setposId(e.target.value)}
                >
                  <option value="">- Pilih Pos Parkir -</option>
                  {dataPos ? (
                    <>
                      {dataPos.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
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
          </Modal.Body>
        </Modal>

        {/* Modal By Status */}
        <Modal show={showByStatus} onHide={handleCloseByStatus}>
          <Modal.Header closeButton>
            <Modal.Title>Filter By Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={HandleFilterStatus}>
              <div className="form-group">
                <label>Status Transaksi </label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">- Pilih Status -</option>
                  <option value="in">IN</option>
                  <option value="out">OUT</option>
                </select>
              </div>

              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Table */}
        <div className="row">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Waktu Kendaraan Masuk</th>
                <th>Pos Parkir</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <center>
                      <h4>Loading ...</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {isError ? (
                <tr>
                  <td colSpan={5}>
                    <center>
                      <h4>{error}</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {!isLoading && !isError ? (
                <>
                  {dataTrans.map((transaksi, index) => (
                    <tr key={transaksi.id}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(transaksi.kendaraanMasuk).toLocaleString()}
                      </td>
                      <td>{transaksi.po?.nama}</td>
                      <td>{transaksi.status.toUpperCase()}</td>
                      <td>
                        <Link
                          to={`/detail-transaksi/${transaksi.id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Detail
                        </Link>
                        {/* <button
                          onClick={() => {
                            HandleDelete(transaksi.id);
                          }}
                          className="btn btn-sm btn-danger m-1"
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </MasterLayout>
  );
}

export default ListTransaksi;
