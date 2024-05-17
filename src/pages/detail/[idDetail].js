import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState(); // initialize with an empty object

  const { idDetail } = router.query;

  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail?id=${idDetail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.data) {
          setDetail(null);
          alert("Data tidak ditemukan");
          router.push(`/`);
        } else {
          setDetail(data.data);
        }
      });
  }, [idDetail]); // specify an empty dependency array

  return (
    <div>
      {dataDetail === undefined && <p>Loading...</p>}
      {dataDetail === null && <p>Data Kosong</p>}
      {dataDetail && (
        <div>
          Ini Halaman Detail:
          <p>ID: {dataDetail.id}</p>
          <p>Keterangan: {dataDetail.keterangan}</p>
          <p>Income: {dataDetail.income}</p>
          <p>Outcome: {dataDetail.outcome} </p>
          <p>Tanggal: {dataDetail.tanggal} </p>
          <p>Bulan: {dataDetail.bulan} </p>
          <p>Tahun: {dataDetail.tahun} </p>
          <p>Created: {dataDetail.created_at} </p>
        </div>
      )}
    </div>
  );
}
