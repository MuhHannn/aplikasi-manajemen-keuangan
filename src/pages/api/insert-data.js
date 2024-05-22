import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { keterangan, income, outcome, tanggal, bulan, tahun } = await req.body;

  if (!keterangan || !tanggal || !bulan || !tahun) {
    return res.status(400).json({ error: "Data harus valid" });
  }

  if (income == 0 && outcome == 0) {
    return res.status(400).json({ error: "Income atau Outcome harus diisi" });
  }

  if (income != 0 && outcome != 0) {
    return res
      .status(400)
      .json({ error: "Income atau outcome hanya boleh diisi salah satu" });
  }

  const resData =
    await sql`INSERT INTO aplikasi_keuangan (keterangan, income, outcome, tanggal, bulan, tahun)
  VALUES (${keterangan}, ${income}, ${outcome}, ${tanggal}, ${bulan}, ${tahun})`;

  return res.status(200).json({ message: "saved", data: resData });
}
