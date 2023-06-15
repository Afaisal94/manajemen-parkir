import React, { useEffect, useState } from "react";
import { MasterLayout } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBiaya, deleteBiaya } from "../../../hooks/useBiayaParkir";
import Swal from "sweetalert2";

function BiayaParkir() {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["biayaParkir"],
    queryFn: getBiaya,
  });
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await deleteBiaya({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["biayaParkir"] });
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
        <h1 className="mt-4">Biaya Parkir</h1>
        <ol className="breadcrumb mb-4 mt-4"></ol>
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Jenis Kendaraan</th>
                <th>Biaya Parkir</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3}>
                    <center>
                      <h4>Loading ...</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {isError ? (
                <tr>
                  <td colSpan={3}>
                    <center>
                      <h4>{error.message}</h4>
                    </center>
                  </td>
                </tr>
              ) : null}

              {!isLoading && !isError ? (
                <>
                  {data.map((biaya, index) => (
                    <tr key={biaya.id}>
                      <td>{index+1}</td>
                      <td>{biaya.jenis}</td>
                      <td>Rp. {biaya.biaya}</td>
                      <td>
                        <Link
                          to={`/biaya/edit/${biaya.id}`}
                          className="btn btn-sm btn-success m-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            HandleDelete(biaya.id);
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

export default BiayaParkir;
