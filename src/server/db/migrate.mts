import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '../../env.mjs';

const main = async () => {
  const client = postgres(env.DATABASE_URL, { prepare: false, max: 1 });

  await migrate(drizzle(client), {
    migrationsFolder: 'src/server/db/drizzle',
  });

  await client.end();
  process.exit(0);
};

main().catch((_e) => {
  process.exit(1);
});
