import Home from "./home";
import Login from "./auth/login"

// Admin Master
import { Dashboard, 
  ListKendaraan, AddKendaraan, EditKendaraan, 
  ListKaryawan, AddKaryawan, EditKaryawan,
  ListPos, AddPos, EditPos,
  ListJadwal, EditJadwal, 
  ListTransaksi, DetailTransaksi,
  ListMember, AddMember, EditMember,
  ListLaporan, LaporanHarian, LaporanBulanan, LaporanTahunan
 } from "./master";

// Admin Parkir
import { KmIndex,
  KkIndex, KkScanBarcode, KkManual,
  TransaksiParkir, TransaksiDetail,
  Member, DaftarMember 
  } from "./admin";

import NotFound from "./notfound";

export {
  Home,
  Login,
  Dashboard,
  ListKendaraan, AddKendaraan, EditKendaraan,
  ListKaryawan, AddKaryawan, EditKaryawan,
  ListPos, AddPos, EditPos,
  ListJadwal, EditJadwal,
  ListTransaksi, DetailTransaksi,
  ListMember, AddMember, EditMember,
  ListLaporan, LaporanHarian, LaporanBulanan, LaporanTahunan,
  NotFound,
  KmIndex,
  KkIndex, KkScanBarcode, KkManual,
  TransaksiParkir, TransaksiDetail,
  Member, DaftarMember
};
