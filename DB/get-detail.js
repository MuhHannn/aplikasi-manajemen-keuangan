require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(id) {
    const { rows } = await sql`
        SELECT * FROM aplikasi keuangan WHERE id = ${id}`;
    console.log(rows);
}

execute(1);
