import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getMember = async () => {
  const response = await axios.get(`${BaseApiUrl}/member`);
  return response.data;
};

const getMemberById = async (id) => {
  const response = await axios.get(`${BaseApiUrl}/member/${id}`);
  return response.data;
};

const deleteMember = async ({ id }) => {
  await axios.delete(`${BaseApiUrl}/member/${id}`);
  return id;
};

const createMember = async ({ nama, telepon, nopol, noStnk, tglExpired }) => {
  const response = await axios.post(`${BaseApiUrl}/member`, {
    nama, telepon, nopol, noStnk, tglExpired
  });
  return response.data;
};

const updateMember = async ({ id, nama, telepon, nopol, noStnk, tglExpired }) => {  
  const response = await axios.patch(`${BaseApiUrl}/member/${id}`, {
    nama, telepon, nopol, noStnk, tglExpired
  });
  return response.data;
};

export {
  getMember,
  deleteMember,
  getMemberById,
  createMember,
  updateMember
};
