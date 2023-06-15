import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransaksiByPosId } from "../../../../hooks/useTransaksi";

function TransaksiParkir() {
  const navigate = useNavigate();
  const posId = localStorage.getItem("posId");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["transaksiByPosId", posId],
    queryFn: async () => await getTransaksiByPosId({posId}),
  });

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Data Transaksi Parkir</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>

        {/* Table */}
        <div className="row">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Status</th>
                <th>Waktu Kendaraan Masuk</th>
                <th>Waktu Kendaraan Keluar</th>                
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
                      <h4>{error.message}</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {!isLoading && !isError ? (
                <>
                  {data.map((transaksi, index) => (
                    <tr key={transaksi.id}>
                      <td>{index + 1}</td>
                      <td>{transaksi.status.toUpperCase()}</td>
                      <td>
                        {new Date(transaksi.kendaraanMasuk).toLocaleString()}
                      </td>
                      {transaksi.status != "in" ? (
                      <>
                        <td>
                          {new Date(transaksi.kendaraanKeluar).toLocaleString()}
                        </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                      </>
                    )}
                      
                      <td>
                        <Link
                          to={`/transaksi-detail/${transaksi.id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TransaksiParkir;
