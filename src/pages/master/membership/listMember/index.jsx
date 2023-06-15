import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMember, deleteMember } from "../../../../hooks/useMember";
import Swal from "sweetalert2";

function ListMember() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["member"],
    queryFn: getMember,
  });
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteMember({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["member"] });
    },
  });
  const HandleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Data Membership</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Link to={"/add-member"} className="btn btn-primary">
              Tambah Member
            </Link>
          </li>
        </ol>
        <div className="row">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>No Polisi</th>
                <th>Tanggal Expired Membership</th>
                <th>Action</th>
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
                      <td>{new Date(member.tglExpired).toDateString()}</td>
                      <td>
                        <Link
                          to={`/edit-member/${member.id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            HandleDelete(member.id);
                          }}
                          className="btn btn-sm btn-danger m-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </MasterLayout>
  );
}

export default ListMember;
