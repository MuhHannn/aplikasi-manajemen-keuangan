require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  const deleteTable = await sql`drop table if exists aplikasi_keuangan`;

  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS aplikasi_keuangan (
        id SERIAL PRIMARY KEY,
        keterangan VARCHAR(150) NOT NULL,
        income integer NOT NULL,
        outcome integer NOT NULL,
        tanggal integer NOT NULL,
        bulan integer NOT NULL,
        tahun integer NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    ) 
    `;
  console.log(createTable);
}

execute();
