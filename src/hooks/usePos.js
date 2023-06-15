import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getPos = async () => {
  const response = await axios.get(`${BaseApiUrl}/pos`);
  return response.data;
};

const getPosById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/pos/${id}`);
  return response.data;
};

const deletePos = async ({ id }) => {
  await axios.delete(`${BaseApiUrl}/pos/${id}`);
  return id;
};

const createPos = async ({ nama, kendaraanId }) => {
  const response = await axios.post(`${BaseApiUrl}/pos`, {
    nama, kendaraanId
  });
  return response.data;
};

const updatePos = async ({ id, nama, kendaraanId }) => {
  const response = await axios.patch(`${BaseApiUrl}/pos/${id}`, {
    nama, kendaraanId
  });
  return response.data;
};

export {
  getPos,
  deletePos,
  getPosById,
  createPos,
  updatePos
};
