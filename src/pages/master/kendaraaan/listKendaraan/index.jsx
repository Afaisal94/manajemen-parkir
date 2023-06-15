import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getKendaraan, deleteKendaraan } from "../../../../hooks/useKendaraan";
import Swal from "sweetalert2";

function ListKendaraan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["kendaraan"],
    queryFn: getKendaraan,
  });
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteKendaraan({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["kendaraan"] });
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
        <h1 className="mt-4">Jenis Kendaraan</h1>
        <ol className="breadcrumb mb-4 mt-4">
          <li className="breadcrumb-item active">
            <Link to={"/add-kendaraan"} className="btn btn-primary">
              Tambah Kendaraan
            </Link>
          </li>
        </ol>
        <div className="row">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Jenis Kendaraan</th>
                <th>Biaya Parkir Per Jam</th>
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
                  {data.map((kendaraan, index) => (
                    <tr key={kendaraan.id}>
                      <td>{index + 1}</td>
                      <td>{kendaraan.jenis}</td>
                      <td>Rp. {kendaraan.biaya}</td>
                      <td>
                        <Link
                          to={`/edit-kendaraan/${kendaraan.id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            HandleDelete(kendaraan.id);
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

export default ListKendaraan;
