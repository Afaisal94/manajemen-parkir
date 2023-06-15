import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getLaporanHarian = async ({ awal, akhir }) => {
  const response = await axios.post(`${BaseApiUrl}/laporan/harian`, {
    awal,
    akhir,
  });
  return response.data;
};

const getLaporanBulanan = async ({ bulan }) => {
  const response = await axios.post(`${BaseApiUrl}/laporan/bulanan`, {
    bulan,
  });
  return response.data;
};

const getLaporanTahunan = async ({ tahun }) => {
  const response = await axios.post(`${BaseApiUrl}/laporan/tahunan`, {
    tahun,
  });
  return response.data;
};

export { getLaporanHarian, getLaporanBulanan, getLaporanTahunan };
