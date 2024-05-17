import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState();

  const { idEdit } = router.query;

  useEffect(() => {
    if (!idEdit) return;

    fetch(`/api/get-detail?id=${idEdit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetail(data.data ? data.data : null);
        console.log(data.data);
      });
  }, [idEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const keterangan = event.target.keterangan.value;
    const income = event.target.income.value;
    const outcome = event.target.outcome.value;
    const tanggal = event.target.tanggal.value;
    const bulan = event.target.bulan.value;
    const tahun = event.target.tahun.value;

    fetch(`/api/update-data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //wajib ada
      },
      body: JSON.stringify({
        keterangan: keterangan,
        income: income,
        outcome: outcome,
        tanggal: tanggal,
        bulan: bulan,
        tahun: tahun,
        id: idEdit,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push(`/`);
      })
      .catch((data) => {
        alert("error: ", data.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      {dataDetail === undefined && <p className="text-gray-700">Loading...</p>}
      {dataDetail === null && <p className="text-red-500">Data Kosong</p>}
      {dataDetail && (
        <div className="bg-white shadow-md rounded p-8 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Keterangan:</label>
              <input
                name="keterangan"
                defaultValue={dataDetail.keterangan}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Income:</label>
              <input
                name="income"
                defaultValue={dataDetail.income}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Outcome:</label>
              <input
                name="outcome"
                defaultValue={dataDetail.outcome}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Tanggal:</label>
              <input
                name="tanggal"
                defaultValue={dataDetail.tanggal}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Bulan:</label>
              <input
                name="bulan"
                defaultValue={dataDetail.bulan}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Tahun:</label>
              <input
                name="tahun"
                defaultValue={dataDetail.tahun}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Data
              </button>
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
          </form>
        </div>
      )}
    </div>
  );
}
