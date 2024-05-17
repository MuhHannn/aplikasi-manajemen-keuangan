import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState();

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
  }, [idDetail]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      {dataDetail === undefined && <p className="text-gray-700">Loading...</p>}
      {dataDetail === null && <p className="text-red-500">Data Kosong</p>}
      {dataDetail && (
        <div className="bg-white shadow-md rounded p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Ini Halaman Detail:</h2>
          <p className="mb-2">
            <span className="font-semibold">ID:</span> {dataDetail.id}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Keterangan:</span>{" "}
            {dataDetail.keterangan}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Income:</span> {dataDetail.income}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Outcome:</span> {dataDetail.outcome}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Tanggal:</span> {dataDetail.tanggal}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Bulan:</span> {dataDetail.bulan}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Tahun:</span> {dataDetail.tahun}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Created:</span>{" "}
            {dataDetail.created_at}
          </p>
          <button
            type="button"
            onClick={() => {
              router.push(`/`);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
}
