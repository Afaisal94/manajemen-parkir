import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMember } from "../../../hooks/useMember";

function Member() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["member"],
    queryFn: getMember,
  });

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Data Member</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>No Polisi</th>
                <th>Tanggal Expired Membership</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>
                    <center>
                      <h4>Loading ...</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {isError ? (
                <tr>
                  <td colSpan={4}>
                    <center>
                      <h4>{error.message}</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {!isLoading && !isError ? (
                <>
                  {data.map((member, index) => (
                    <tr key={member.id}>
                      <td>{index + 1}</td>
                      <td>{member.nama}</td>
                      <td>{member.nopol}</td>
                      <td>{new Date(member.tglExpired).toLocaleDateString()}</td>
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

export default Member;
