import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { error, redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      /**
       * Note: You have to add the `path` variable to the
       * set and remove method due to sveltekit's cookie API
       * requiring this to be set, setting the path to an empty string
       * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
       */
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' })
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' })
      },
    },
  })
  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}

export const authorization: Handle = async ({ event, resolve }) => {
  // protect requests to all routes that start with /protected-routes
  const session = await event.locals.getSession();
  const excludedAuthPaths = [
    "/auth/logout",
    "/auth/callback"
  ];
  if (event.url.pathname.startsWith('/auth') && !excludedAuthPaths.includes(event.url.pathname) && session) {
    let path = event.url.searchParams.get('next');
    let url = path ?? '/app/dashboard';
    throw redirect(303, url);
  }
  if (event.url.pathname.startsWith('/app') && !session) {
    // the user is not signed in
    throw redirect(303, `/auth/login?next=${event.url.pathname}`)
  }

  return resolve(event)
}
export const handle = sequence(supabase, authorization)