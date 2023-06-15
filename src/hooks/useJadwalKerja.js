import axios from "axios";
import { BaseApiUrl } from "../utils/BaseApiUrl";

const getJadwalKerja = async () => {
  const response = await axios.get(`${BaseApiUrl}/jadwalkerja/1`);
  return response.data;
};

const updateJadwalKerja = async ({
  bulan,
  tahun,
  seninPagi,
  seninSore,
  selasaPagi,
  selasaSore,
  rabuPagi,
  rabuSore,
  kamisPagi,
  kamisSore,
  jumatPagi,
  jumatSore,
}) => {
  const response = await axios.patch(`${BaseApiUrl}/jadwalkerja/1`, {
    bulan,
    tahun,
    seninPagi,
    seninSore,
    selasaPagi,
    selasaSore,
    rabuPagi,
    rabuSore,
    kamisPagi,
    kamisSore,
    jumatPagi,
    jumatSore,
  });
  return response.data;
};

export { getJadwalKerja, updateJadwalKerja };
