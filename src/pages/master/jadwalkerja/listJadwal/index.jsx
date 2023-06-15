import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJadwalKerja } from "../../../../hooks/useJadwalKerja";

function ListJadwal() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["jadwalkerja"],
    queryFn: getJadwalKerja,
  });
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Jadwal Kerja</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Link to={"/edit-jadwal"} className="btn btn-primary">
              Edit Jadwal Kerja
            </Link>
          </li>
        </ol>
        <div className="row">
          {isLoading ? (
            <center>
              <h4>Loading ...</h4>
            </center>
          ) : null}

          {isError ? (
            <center>
              <h4>{error.message}</h4>
            </center>
          ) : null}

          {!isLoading && !isError ? (
            <>
              <center>
                <h3>
                  {data?.bulan} {data?.tahun}
                </h3>
                <br />
              </center>

              <table
                className="table table-bordered table-dark"
                style={{ width: "80%", margin: "0 auto" }}
              >
                <tbody>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      1
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Senin
                    </td>
                    <td>Pagi</td>
                    <td>{data?.seninPagi}</td>
                  </tr>
                  <tr>
                    <td>Sore</td>
                    <td>{data?.seninSore}</td>
                  </tr>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      2
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Selasa
                    </td>
                    <td>Pagi</td>
                    <td>{data?.selasaPagi}</td>
                  </tr>
                  <tr>
                    <td>Sore</td>
                    <td>{data?.selasaSore}</td>
                  </tr>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      3
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Rabu
                    </td>
                    <td>Pagi</td>
                    <td>{data?.rabuPagi}</td>
                  </tr>
                  <tr>
                    <td>Sore</td>
                    <td>{data?.rabuSore}</td>
                  </tr>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      4
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Kamis
                    </td>
                    <td>Pagi</td>
                    <td>{data?.kamisPagi}</td>
                  </tr>
                  <tr>
                    <td>Sore</td>
                    <td>{data?.kamisSore}</td>
                  </tr>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      5
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      Jumat
                    </td>
                    <td>Pagi</td>
                    <td>{data?.jumatPagi}</td>
                  </tr>
                  <tr>
                    <td>Sore</td>
                    <td>{data?.jumatSore}</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      </div>
    </MasterLayout>
  );
}

export default ListJadwal;
