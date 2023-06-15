import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransaksiById } from "../../../../hooks/useTransaksi";

function TransaksiDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["TransaksiById", id],
    queryFn: async () => await getTransaksiById(id),
  });
  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Transaksi Detail</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
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
          <table className="table table-bordered">
            <tbody>
              {!isLoading && !isError ? (
                <>
                  <tr>
                    <td>Kode Parkir</td>
                    <td>PARKIR-{data.id}</td>
                  </tr>
                  <tr>
                    <td>Kendaraan Masuk</td>
                    <td>{new Date(data.kendaraanMasuk).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Kendaraan Keluar</td>
                    {data.status != "in" ? (
                      <>
                        <td>
                          {new Date(data.kendaraanKeluar).toLocaleString()}
                        </td>
                      </>
                    ) : (
                      <>
                        <td></td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{data.status.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td>Nama Petugas</td>
                    <td>{data?.user?.nama}</td>
                  </tr>
                  <tr>
                    <td>Nama Pos</td>
                    <td>{data.po.nama}</td>
                  </tr>
                  <tr>
                    <td>Lama Parkir (jam) </td>
                    <td>{data?.totalJam ? data?.totalJam : '-'} Jam</td>
                  </tr>
                  <tr>
                    <td>Biaya Parkir</td>
                    <td>Rp {data?.totalBiaya ? data?.totalBiaya.toLocaleString() : '-'}</td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TransaksiDetail;
