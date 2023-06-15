import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Laporan(props) {
  const { judul, data } = props;
  return (
    <Container ref={props.pdfRef}>
      <Row className="justify-content-center">
        <Col md={10}>
          <center>
            <h2>{judul}</h2>
          </center>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Nama Pos</th>
                <th>Lama Parkir</th>
                <th>Total Biaya Parkir</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                <>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{new Date(item.kendaraanKeluar).toLocaleString()}</td>
                      <td>{item.po?.nama}</td>
                      <td>{item.totalJam} Jam</td>
                      <td>Rp. {item?.totalBiaya.toLocaleString()}</td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}

export default Laporan;
