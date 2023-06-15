import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getBiaya = async () => {
  const response = await axios.get(`${BaseApiUrl}/biaya_parkir`);
  return response.data;
};

const getBiayaById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/biaya_parkir/${id}`);
  return response.data;
};

const deleteBiaya = async ({ id }) => {
  await axios.delete(`${BaseApiUrl}/biaya_parkir/${id}`);
  return id;
};

const createBiaya = async ({ name }) => {
  const response = await axios.post(`${BaseApiUrl}/biaya_parkir`, {
    jenis, biaya
  });
  return response.data;
};

const updateBiaya = async ({ id, jenis, biaya }) => {
  const response = await axios.patch(`${BaseApiUrl}/biaya_parkir/${id}`, {
    jenis, biaya
  });
  return response.data;
};

export {
  getBiaya,
  deleteBiaya,
  getBiayaById,
  createBiaya,
  updateBiaya
};
