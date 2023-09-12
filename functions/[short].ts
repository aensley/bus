import { Env } from '../src/ts/types'

/**
 * Handle the GET method.
 *
 * @param context The request context.
 * @returns Response object.
 */
export const onRequestGet: PagesFunction<Env> = async function (context) {
  const shortParam: string | string[] = context.params.short ?? ''
  const short = Array.isArray(shortParam) ? shortParam[0] : shortParam
  // Get the long URL from KV store.
  const long: string = (await context.env.URLKV.get(short)) ?? ''
  if (long.length < 1) {
    // Invalid short code supplied. Redirect to the home page.
    return new Response('', {
      status: 302, // Temporary redirect
      headers: {
        Location: '/?404=' + short
      }
    })
  }

  // Short code found. Send them to the long URL!
  return new Response('', {
    status: 301, // Permanent redirect
    headers: {
      Location: long
    }
  })
}
