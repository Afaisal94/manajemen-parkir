import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getKaryawan = async () => {
  const response = await axios.get(`${BaseApiUrl}/karyawan`);
  return response.data;
};

const getKaryawanById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/karyawan/${id}`);
  return response.data;
};

const deleteKaryawan = async ({ id }) => {
  await axios.delete(`${BaseApiUrl}/karyawan/${id}`);
  return id;
};

const createKaryawan = async ({ email, password, nama, nik, telepon, role }) => {
  const response = await axios.post(`${BaseApiUrl}/karyawan`, {
    email, password, role, nama, nik, telepon
  });
  return response.data;
};

const updateKaryawan = async ({ id, email, nama, nik, telepon }) => {
  const response = await axios.patch(`${BaseApiUrl}/karyawan/${id}`, {
    email, nama, nik, telepon
  });
  return response.data;
};

export {
  getKaryawan,
  deleteKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan
};
 