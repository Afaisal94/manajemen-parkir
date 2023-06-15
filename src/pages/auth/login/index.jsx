import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthLayout } from "../../../components";
import { BaseApiUrl } from "../../../utils/BaseApiUrl";
import { useQuery } from "@tanstack/react-query";
import { getPos } from "../../../hooks/usePos";

function Login() {
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userRole, setUserRole] = useState(role);
  const [posId, setPosId] = useState(0);
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("role") == "master") {
        navigate("/kendaraan");
      } else {
        navigate("/kendaraan-keluar");
      }
    }
  }, []);

  const { isLoading, data } = useQuery({
    queryKey: ["pos"],
    queryFn: getPos,
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);
    await axios
      .post(`${BaseApiUrl}/auth/login`, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("nama", response.data.user.nama);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("posId", posId);
        if (response.data.user.role == "master") {
          localStorage.setItem("role", response.data.user.role);
          navigate("/kendaraan");
        } else {
          localStorage.setItem("role", response.data.user.role);
          navigate("/kendaraan-keluar");
        }
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div>
      <AuthLayout>
        <div className="card-header bg-secondary">
          <h3 className="text-center font-weight-light my-4">
            LOGIN {role.toUpperCase()}
          </h3>
        </div>
        <div className="card-body">
          {validation.message && (
            <div className="alert alert-danger">{validation.message}</div>
          )}
          <form onSubmit={loginHandler}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                type="password"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            {role == "admin" ? (
              <div className="form-floating mb-3">
                <select
                  className="form-control"
                  onChange={(e) => setPosId(e.target.value)}
                >
                  <option value="">- Pilih Pos Parkir -</option>
                  {!isLoading ? (
                    <>
                      {data.map((item) => (
                        <option value={item.id}>{item.nama}</option>
                      ))}
                    </>
                  ) : null}
                </select>
                <label>Nama Pos</label>
              </div>
            ) : null}
            <div className="d-grid gap-2 mt-4 mb-0">
              <button type="submit" className="btn btn-secondary">
                Login
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;
