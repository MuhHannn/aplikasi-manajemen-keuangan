require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(title, contain) {
  const result = await sql`
        INSERT INTO aplikasi_keuangan (keterangan, income, outcome, tanggal, bulan, tahun)
        VALUES (${keterangan}, ${income}, ${outcome}, ${tanggal}, ${bulan}, ${tahun})
        `;
  console.log(result);
}

execute("Membeli Baju", 0, 100000, 16, 5, 2024);
