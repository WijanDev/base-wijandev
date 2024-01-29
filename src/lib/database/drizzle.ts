import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { PUBLIC_SUPABASE_CONNECTION_STRING } from '$env/static/public'
const connectionString = process.env.DATABASE_URL
// Disable prefetch as it is not supported for "Transaction" pool mode 
const client = postgres(PUBLIC_SUPABASE_CONNECTION_STRING, { prepare: false })
const db = drizzle(client);