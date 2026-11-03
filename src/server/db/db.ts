import { env } from '@/env.mjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// `prepare: false` is required for Supabase's transaction pooler (port 6543).
const client = postgres(env.DATABASE_URL, { prepare: false, max: 1 });

export const db = drizzle(client, { schema });
