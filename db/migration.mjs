import {migrate} from "postgres-migrations"
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

export default async () => {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV !== 'production'? undefined: {
      rejectUnauthorized: false,
    }
  })
  await client.connect()
  await migrate(
    {client},
    path.join(
      path.dirname(
        fileURLToPath(import.meta.url)
      ),
      '/migrations'
    )
  )  
  return client.end();
}