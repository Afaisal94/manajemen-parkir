import React from "react";
import { AdminLayout } from "../../../../components";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function KkIndex() {
  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <center>
          <h1 className="mt-4">Kendaraan Keluar</h1>
        </center>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <Row>
          <Col md={6}>
            <div className="card">
              <div className="card-body">
                <center>
                  <h2>Scan Barcode</h2>
                  <br />
                  <Link
                    to={"/kk-scan"}
                    className="btn btn-lg w-100 btn-success"
                  >
                    Klik Disini
                  </Link>
                </center>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card">
              <div className="card-body">
                <center>
                  <h2>Manual Input</h2>
                  <br />
                  <Link
                    to={"/kk-manual"}
                    className="btn btn-lg w-100 btn-success"
                  >
                    Klik Disini
                  </Link>
                </center>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}

export default KkIndex;
