import pg from "pg";
const { Pool } = pg;
import 'dotenv/config';


// export const db = new Pool({
//     user: "EXAM_owner",
//     host: "ep-dawn-surf-a5pcy1h0-pooler.us-east-2.aws.neon.tech",
//     database: "EXAM",
//     password: "npg_liXg9H0ALysb",
//     port: 5432,
//     ssl: { rejectUnauthorized: false }
// });


export const db = new Pool({
    connectionString: "postgresql://EXAM_owner:npg_liXg9H0ALysb@ep-dawn-surf-a5pcy1h0-pooler.us-east-2.aws.neon.tech/EXAM?sslmode=require&channel_binding=require",
    ssl: {
        rejectUnauthorized: false, // Often required for Neon connections
    },
});

