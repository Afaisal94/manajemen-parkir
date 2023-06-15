import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import masterImg from "./../assets/img/master-img.png";
import adminImg from "./../assets/img/admin-img.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <body>
      <Container>
        <Row>
          <center>
            <h2 style={{marginTop: '30px', marginBottom: '50px'}}>Sistem Informasi Management Parkir Pada PT Bina Karsa Swadaya</h2>
          </center>
          <Col md={3}></Col>
          <Col md={3}>
            <div className="card">
              <img
                className="card-img-top"
                src={masterImg}
                alt="Card image"
              />
              <div className="card-body">
                <center>
                  <Link to={"/login/master"} className="btn btn-lg w-100 btn-success">
                    Admin Master
                  </Link>
                </center>
              </div>
            </div>
          </Col>
          <Col md={3}>
          <div className="card">
              <img
                className="card-img-top"
                src={adminImg}
                alt="Card image"
              />
              <div className="card-body">
                <center>
                <Link to={"/login/admin"} className="btn btn-lg w-100 btn-success">
                    Admin Parkir
                  </Link>
                </center>
              </div>
            </div>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </body>
  );
}

export default Home;
