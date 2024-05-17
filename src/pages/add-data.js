import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const keterangan = event.target.keterangan.value;
    const income = event.target.income.value;
    const outcome = event.target.outcome.value;
    const tanggal = event.target.tanggal.value;
    const bulan = event.target.bulan.value;
    const tahun = event.target.tahun.value;

    // console.log(keterangan, income);

    fetch("/api/insert-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keterangan: keterangan,
        income: income,
        outcome: outcome,
        tanggal: tanggal,
        bulan: bulan,
        tahun: tahun,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push("/");
      })
      .catch((err) => {
        alert("hubungi saya", err.message);
      });
  };

  return (
    <div>
      <p>Ini Halaman Add Data</p>
      <div>
        <form onSubmit={handleAdd}>
          <label>Keterangan: </label>
          <input name="keterangan" required></input>
          <label>Income: </label>
          <input name="income" required></input>
          <label>Outcome: </label>
          <input name="outcome" required></input>
          <label>Tanggal: </label>
          <input name="tanggal" required></input>
          <label>Bulan: </label>
          <input name="bulan" required></input>
          <label>Tahun: </label>
          <input name="tahun" required></input>
          <div>
            <button type="submit">Add Data</button>
          </div>
        </form>
      </div>
    </div>
  );
}
