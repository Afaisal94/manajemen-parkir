import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Barcode from "react-barcode";

function Ticket(props) {
  const { pos, kode, waktu } = props;
  return (
    <Container ref={props.pdfRef}>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card" style={{ backgroundColor: "#DBDFE5" }}>
            <div className="card-body">
              <center>
                <h2>Parking Ticket</h2>
              </center>
              <br />
              <p>
                <b>Gedung Bidakara</b>
              </p>
              <p>
                Nama Pos : {pos} <br />
                Kode : PARKING-{kode} <br />
                Waktu Masuk :{" "}
                {new Date(waktu).toLocaleString()}
              </p>
              <div>
                <center>
                  <Barcode value={"PARKING-" + kode} />
                </center>
                <br />
                <div style={{ border: "1px solid black" }}>
                  <p style={{ fontSize: "11px", margin: "3px" }}>
                    Note :<br />- Apabila tiket parkir hilang harus menunjukan
                    STNK <br />- Barang yang hilang bukan tanggung jawab
                    manajemen parkir
                  </p>
                </div>
              </div>
              <br />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Ticket;
