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
    <div>
      {dataDetail === undefined && <p>Loading...</p>}
      {dataDetail === null && <p>Data Kosong</p>}
      {dataDetail && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="keterangan"
                defaultValue={dataDetail.keterangan}
              ></input>
              <input name="income" defaultValue={dataDetail.income}></input>
              <input name="outcome" defaultValue={dataDetail.outcome}></input>
              <input name="tanggal" defaultValue={dataDetail.tanggal}></input>
              <input name="bulan" defaultValue={dataDetail.bulan}></input>
              <input name="tahun" defaultValue={dataDetail.tahun}></input>
            </div>
            <div>
              <button type="submit">Update Data</button>
              <button
                onClick={() => {
                  router.push(`/`);
                }}
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
