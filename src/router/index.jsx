import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Home,
  Login, 
  ListKendaraan, AddKendaraan, EditKendaraan, 
  ListKaryawan, AddKaryawan, EditKaryawan,
  ListPos, AddPos, EditPos,
  ListJadwal, EditJadwal, 
  ListTransaksi, DetailTransaksi,
  ListMember, AddMember, EditMember,
  ListLaporan,
  KmIndex,
  KkIndex, KkScanBarcode, KkManual,
  Member, DaftarMember, 
  TransaksiParkir, TransaksiDetail,
  NotFound,
  
  
} from "../pages";

export const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
           
          {/* Admin Master */}
          <Route path="/kendaraan" element={<ListKendaraan />} />
          <Route path="/add-kendaraan" element={<AddKendaraan />} />
          <Route path="/edit-kendaraan/:id" element={<EditKendaraan />} />

          <Route path="/karyawan" element={<ListKaryawan />} />
          <Route path="/add-karyawan" element={<AddKaryawan />} />
          <Route path="/edit-karyawan/:id" element={<EditKaryawan />} />

          <Route path="/pos-parkir" element={<ListPos />} />
          <Route path="/add-pos" element={<AddPos />} />
          <Route path="/edit-pos/:id" element={<EditPos />} />

          <Route path="/jadwal-kerja" element={<ListJadwal />} />
          <Route path="/edit-jadwal" element={<EditJadwal />} />

          <Route path="/data-transaksi" element={<ListTransaksi />} />
          <Route path="/detail-transaksi/:id" element={<DetailTransaksi />} />

          <Route path="/membership" element={<ListMember />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/edit-member/:id" element={<EditMember />} />

          <Route path="/laporan" element={<ListLaporan />} />

          {/* Admin Parkir */}
          <Route path="/kendaraan-masuk" element={<KmIndex />} />

          <Route path="/kendaraan-keluar" element={<KkIndex />} />
          <Route path="/kk-scan" element={<KkScanBarcode />} />
          <Route path="/kk-manual" element={<KkManual />} />

          <Route path="/transaksi-parkir" element={<TransaksiParkir />} />
          <Route path="/transaksi-detail/:id" element={<TransaksiDetail />} />

          <Route path="/data-member" element={<Member />} />
          <Route path="/daftar-member" element={<DaftarMember />} />

          {/* Auth */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login/:role" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};
