import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { Button, Col, Row } from "react-bootstrap";
import { transaksiOut } from "../../../../hooks/useTransaksi";
import { Scanner } from "../../../../components";

function KkScanBarcode() {
  const userId = localStorage.getItem("userId");
  const [value, setValue] = useState(0);
  // const [id, setId] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const [kendaraanMasuk, setKendaraanMasuk] = useState("");
  const [kendaraanKeluar, setKendaraanKeluar] = useState("");
  const [totalJam, setTotalJam] = useState(0);
  const [totalBiaya, setTotalBiaya] = useState(0);

  const _onDetected = async (result) => {
    // setResults([]);
    // setResults(results.concat([result]));
    // console.log(result.codeResult.code)
    // setValue(result.codeResult.code);
    // console.log(result.codeResult.code.replace("PARKING-", ""));
    const resu = result.codeResult.code;
    const id = resu.replace("PARKING-", "")
    console.log(id);

    await transaksiOut({ id, userId })
      .then((res) => {
        console.log(res.data);
        setKendaraanMasuk(res.data.kendaraanMasuk);
        setKendaraanKeluar(res.data.kendaraanKeluar);
        setTotalJam(res.data.totalJam);
        setTotalBiaya(res.data.totalBiaya);
        setIsValid(true);
        setIsScanning(false);
      })
      .catch((error) => {
        setIsValid(false);
        setIsScanning(false);
      });
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Kendaraan Keluar</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <Row>
          {isScanning ? (
            <>
              <Col>
                <center>
                  <h3>Scan Barcode</h3>
                  <Scanner onDetected={_onDetected} />
                </center>
              </Col>
            </>
          ) : (
            <>
              <Col>
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

export default KkScanBarcode;
