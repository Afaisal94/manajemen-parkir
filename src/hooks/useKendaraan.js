import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getKendaraan = async () => {
  const response = await axios.get(`${BaseApiUrl}/kendaraan`);
  return response.data;
};

const getKendaraanById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/kendaraan/${id}`);
  return response.data;
};

const deleteKendaraan = async ({ id }) => {
  await axios.delete(`${BaseApiUrl}/kendaraan/${id}`);
  return id;
};

const createKendaraan = async ({ jenis, biaya }) => {
  const response = await axios.post(`${BaseApiUrl}/kendaraan`, {
    jenis, biaya
  });
  return response.data;
};

const updateKendaraan = async ({ id, jenis, biaya }) => {
  const response = await axios.patch(`${BaseApiUrl}/kendaraan/${id}`, {
    jenis, biaya
  });
  return response.data;
};

export {
  getKendaraan,
  deleteKendaraan,
  getKendaraanById,
  createKendaraan,
  updateKendaraan
};
