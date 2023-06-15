import React, { useEffect, useState, useRef } from "react";
import { AdminLayout, Ticket } from "../../../../components";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTransaksi,
  getTransaksiByPosId,
} from "../../../../hooks/useTransaksi";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

function KmIndex() {
  const componentRef = useRef();
  const queryClient = useQueryClient();
  const posId = localStorage.getItem("posId");
  const [enterButton, setEnterButton] = useState(true);

  const { isLoading, data } = useQuery({
    queryKey: ["transaksiByPostId", posId],
    queryFn: async () => await getTransaksiByPosId({posId}),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await createTransaksi({ posId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transaksiByPostId"] });
    },
  });

  const handleEntry = async (event) => {
    event.preventDefault();
    await mutate({ posId });
    setEnterButton(false);
  };
  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <center>
          <h1 className="mt-4">Kendaraan Masuk</h1>
        </center>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        {enterButton ? (
          <>
            <Row>
              <center>
                <Button
                  onClick={handleEntry}
                  className="btn btn-danger btn-circle btn-xl"
                >
                  Tombol Enter
                </Button>
                <br />
                <br />
                <h5>
                  {" "}
                  Silahkan tekan tombol enter untuk kendaraan yang akan masuk
                </h5>
              </center>
            </Row>
            <br />
          </>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col md={4}>
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
                      Nama Pos : {data[0]?.po?.nama} <br />
                      Kode : PARKING-{data[0].id} <br />
                      Waktu Masuk :{" "}
                      {new Date(data[0].kendaraanMasuk).toLocaleString()}
                    </p>
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <center>
                            <Barcode value={"PARKING-" + data[0].id} />
                          </center>
                        </div>
                      </div>
                      <br />
                      <div style={{ border: "1px solid black" }}>
                        <p style={{ fontSize: "11px", margin: "3px" }}>
                          Note :<br />- Apabila tiket parkir hilang harus
                          menunjukan STNK <br />- Barang yang hilang bukan
                          tanggung jawab manajemen parkir
                        </p>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
                <br />
                <center>
                  <ReactToPrint
                    trigger={() => (
                      <button className="btn btn-primary">Print PDF</button>
                    )}
                    content={() => componentRef.current}
                  />
                  <div style={{ display: "none" }}>
                    <Ticket
                      pdfRef={componentRef}
                      pos={data[0]?.po?.nama}
                      kode={data[0].id}
                      waktu={new Date(data[0].kendaraanMasuk).toLocaleString()}
                    />
                  </div>
                </center>
              </Col>
            </Row>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default KmIndex;
