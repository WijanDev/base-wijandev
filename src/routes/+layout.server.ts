import type { LayoutServerLoad } from './$types'
import { db } from "$lib/shared/infrastructure/db/drizzle/client.drizzle";

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
  const languages = await db.query.languages.findMany();
  return {
    languages,
    session: await getSession(),
  }
}