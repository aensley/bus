import { Env, CreateUrlFormData, UrlRow, DeleteUrlFormData } from '../src/ts/types'
import { createUrl, deleteUrl, getRowByLongUrl, getRowByShortCode, getUrls } from '../src/ts/data'
import { DEFAULT_RESPONSE_HEADERS } from '../src/ts/const'
import { generateShortCode, isValidShortCode, isValidUrl } from '../src/ts/url'
import { convertFormDataToJson } from '../src/ts/form'

/**
 * Handle the GET (Read) method.
 *
 * @param {any} context The request context.
 * @returns {Promise<Response>} Response object.
 */
export const onRequestGet: PagesFunction<Env> = async function (context) {
  const output = { data: [{}] }
  const allRows: UrlRow[] = await getUrls(context)
  for (const row of allRows) {
    output.data.push({ s: row.short, l: row.long, c: row.created })
  }

  return new Response(JSON.stringify(output), {
    status: 200,
    headers: DEFAULT_RESPONSE_HEADERS
  })
}

/**
 * Handle the POST (Create) method.
 *
 * @param {any} context The request context.
 * @returns {Promise<Response>} Response object.
 */
export const onRequestPost: PagesFunction<Env> = async function (context) {
  const headers = context.request.headers
  const input: CreateUrlFormData = convertFormDataToJson(await context.request.formData()) as CreateUrlFormData
  const requestDetails = {
    short: input.short,
    long: input.long,
    userAgent: headers.get('user-agent'),
    userCountry: headers.get('cf-ipcountry'),
    userLanguage: headers.get('accept-language'),
    userIp: headers.get('cf-connecting-ip'),
    cfRay: headers.get('cf-ray'),
    referer: headers.get('referer'),
    environment: headers.get('host')
  }

  // Make sure at least the long URL was supplied.
  if (requestDetails.long.length < 1) {
    return new Response(JSON.stringify({ action: 'create', status: 'error', message: 'Insufficient data supplied' }), {
      status: 400,
      headers: DEFAULT_RESPONSE_HEADERS
    })
  }

  // Validate long URL input
  if (!isValidUrl(requestDetails.long)) {
    return new Response(
      JSON.stringify({
        action: 'create',
        status: 'error',
        message: 'Invalid URL supplied. Correct the URL and try again.'
      }),
      { status: 400, headers: DEFAULT_RESPONSE_HEADERS }
    )
  }

  // Make sure the long URL isn't already shortened.
  const longRow = await getRowByLongUrl(requestDetails.long, context)
  if (longRow != null) {
    return new Response(
      JSON.stringify({
        action: 'create',
        status: 'success',
        message: 'URL is already shortened',
        short: longRow.short,
        long: requestDetails.long
      }),
      { status: 200, headers: DEFAULT_RESPONSE_HEADERS }
    )
  }

  // Make sure the short code (if supplied) is valid and isn't already taken.
  if (requestDetails.short != null && requestDetails.short.length > 0) {
    if (!isValidShortCode(requestDetails.short)) {
      return new Response(
        JSON.stringify({
          action: 'create',
          status: 'error',
          message:
            'Invalid Short Code supplied. Short-codes must contain only alphanumeric and dash (-) characters. Correct the Short Code and try again.'
        }),
        { status: 400, headers: DEFAULT_RESPONSE_HEADERS }
      )
    }
    const shortRow = await getRowByShortCode(requestDetails.short, context)
    if (shortRow != null) {
      return new Response(
        JSON.stringify({
          action: 'create',
          status: 'error',
          message: 'Short URL already exists',
          short: requestDetails.short,
          long: shortRow.long
        }),
        { status: 400, headers: DEFAULT_RESPONSE_HEADERS }
      )
    }
  } else {
    let shortRow: UrlRow | null
    let count = 0
    do {
      const toShorten = requestDetails.long + (count > 0 ? count.toString() : '')
      requestDetails.short = await generateShortCode(toShorten, context)
      // Make sure the auto-generated short code does not collide with an existing record.
      shortRow = await getRowByShortCode(requestDetails.short, context)
      count++
    } while (shortRow != null)
  }

  let output = ''
  let returnStatus = 200
  try {
    const createResult = await createUrl(requestDetails.short, requestDetails.long, context)
    if (createResult) {
      output = JSON.stringify({
        action: 'create',
        status: 'success',
        message: 'Short URL added',
        short: requestDetails.short,
        long: requestDetails.long
      })
    } else {
      output = JSON.stringify({
        action: 'create',
        status: 'error',
        message: 'Unable to add Short URL',
        short: requestDetails.short,
        long: requestDetails.long
      })
      returnStatus = 500
    }
  } catch (err) {
    output = JSON.stringify({
      action: 'create',
      status: 'error',
      message: 'Unable to add Short URL',
      short: requestDetails.short,
      long: requestDetails.long
    })
    returnStatus = 500
  }

  return new Response(output, {
    status: returnStatus,
    headers: DEFAULT_RESPONSE_HEADERS
  })
}

/**
 * Handle the DELETE method.
 *
 * @param {any} context The request context.
 * @returns {Promise<Response>} Response object.
 */
export const onRequestDelete: PagesFunction<Env> = async function (context) {
  const headers = context.request.headers
  const input: DeleteUrlFormData = convertFormDataToJson(await context.request.formData()) as DeleteUrlFormData
  const requestDetails = {
    short: input.short,
    userAgent: headers.get('user-agent'),
    userCountry: headers.get('cf-ipcountry'),
    userLanguage: headers.get('accept-language'),
    userIp: headers.get('cf-connecting-ip'),
    cfRay: headers.get('cf-ray'),
    referer: headers.get('referer'),
    environment: headers.get('host')
  }

  // Make sure the Short Code was supplied.
  if (requestDetails.short.length < 1 || !isValidShortCode(requestDetails.short)) {
    return new Response(JSON.stringify({ action: 'delete', status: 'error', message: 'Insufficient data supplied' }), {
      status: 400,
      headers: DEFAULT_RESPONSE_HEADERS
    })
  }

  const shortRow = await getRowByShortCode(requestDetails.short, context)
  if (shortRow === null) {
    return new Response(
      JSON.stringify({
        action: 'delete',
        status: 'error',
        message: 'Short URL not found'
      }),
      { status: 400, headers: DEFAULT_RESPONSE_HEADERS }
    )
  }

  let output = ''
  let returnStatus = 200
  try {
    const deleteResult = await deleteUrl(requestDetails.short, context)
    if (deleteResult) {
      output = JSON.stringify({
        action: 'delete',
        status: 'success',
        message: 'Short URL deleted',
        short: requestDetails.short
      })
    } else {
      output = JSON.stringify({
        action: 'delete',
        status: 'error',
        message: 'Unable to delete Short URL',
        short: requestDetails.short
      })
      returnStatus = 500
    }
  } catch (err) {
    output = JSON.stringify({
      action: 'delete',
      status: 'error',
      message: 'Unable to delete Short URL',
      short: requestDetails.short
    })
    returnStatus = 500
  }

  return new Response(output, {
    status: returnStatus,
    headers: DEFAULT_RESPONSE_HEADERS
  })
}
