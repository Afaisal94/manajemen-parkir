import React, { useEffect, useState, useRef } from "react";
import { AdminLayout } from "../../../../components";
import { Button, Col, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   createTransaksi,
//   getTransaksiByPosId,
// } from "../../../../hooks/useTransaksi";
import { Scanner } from "../../../../components";

function KmMember() {
  // const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  // const _scan = () => {
  //   setScanning(false);
  // };

  const _onDetected = (result) => {
    // setResults([]);
    // setResults(results.concat([result]));
    // console.log(result.codeResult.code)
    setValue(result.codeResult.code);
    setIsScanning(false);
  };

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Kendaraan Masuk Member</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Button className="btn btn-primary m-2">Scan Barcode</Button>
            <Button className="btn btn-success m-2">Manual Input</Button>
          </li>
        </ol>
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
                <center>
                  <div class="alert alert-success" role="alert">
                    <h4>Verifikasi Member Berhasil, Silahkan Masuk</h4>
                  </div>
                  <p>Barcode : {value}</p>
                </center>
              </Col>
            </>
          )}
        </Row>
      </div>
    </AdminLayout>
  );
}

export default KmMember;
