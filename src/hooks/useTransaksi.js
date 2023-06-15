import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getTransaksi = async () => {
  const response = await axios.get(`${BaseApiUrl}/transaksi`);
  return response.data;
};

const getTransaksiById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/transaksi/${id}`);
  return response.data;
};

const getTransaksiByStatus = async ({status}) => {
  const response = await axios.get(`${BaseApiUrl}/transaksi/status/${status}`);
  return response.data;
};

const getTransaksiByPosId = async ({posId}) => {
  const response = await axios.get(`${BaseApiUrl}/transaksi/pos/${posId}`);
  return response.data;
};

const deleteTransaksi = async ({ id }) => {
  await axios.delete(`${BaseApiUrl}/transaksi/${id}`);
  return id;
};

const createTransaksi = async ({ posId }) => {
  const response = await axios.post(`${BaseApiUrl}/transaksi`, {
    posId,
  });
  return response.data;
};

const transaksiOut = async ({ id, userId }) => {
  const response = await axios.patch(`${BaseApiUrl}/transaksi/${id}`, {
    id,
    userId,
  });
  return response.data;
};

const getTransaksiByDateRange = async ({awal, akhir}) => {
  const response = await axios.post(`${BaseApiUrl}/transaksi/daterange`, {
    awal,
    akhir,
  });
  return response.data;
};

export {
  getTransaksi,
  deleteTransaksi,
  getTransaksiById,
  getTransaksiByStatus,
  getTransaksiByPosId,
  createTransaksi,
  transaksiOut,
  getTransaksiByDateRange,
};
