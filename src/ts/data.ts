import { UrlRow } from './types'

/**
 * Add a URL to the D1 table and KV.
 *
 * @param {string} short   The short code.
 * @param {string} long    The long URL.
 * @param {any}    context The request context.
 * @returns {Promise<boolean>} True on success; false on failure.
 */
export const createUrl = async function (short: string, long: string, context: any): Promise<boolean> {
  const { success } = await context.env.URLD1.prepare('INSERT INTO url (short, long, created) VALUES (?1, ?2, ?3);')
    .bind(short, long, Math.floor(Date.now() / 1000))
    .run()
  if (success as boolean) {
    await context.env.URLKV.put(short, long)
  }

  return success as boolean
}

/**
 * Delete a URL from the D1 table and KV.
 *
 * @param {string} short   The short code.
 * @param {any}    context The request context.
 * @returns {Promise<boolean>} True on success; false on failure.
 */
export const deleteUrl = async function (short: string, context: any): Promise<boolean> {
  const { success } = await context.env.URLD1.prepare('DELETE FROM url WHERE short = ?1;').bind(short).run()
  if (success as boolean) {
    await context.env.URLKV.delete(short)
  }

  return success as boolean
}

/**
 * Retrieve a list of URLs from D1.
 *
 * @param {any}    context   The request context.
 * @param {object} [orderBy] The column(s) to sort by. Default: { 'created': 'ASC' }
 * @param {number} [limit]   The number of rows to return.
 * @param {number} [offset]  The offset at which to start retrieving rows.
 * @returns {Promise<UrlRow[]>} The requested rows.
 */
export const getUrls = async function (
  context: any,
  orderBy?: object,
  limit?: number,
  offset?: number
): Promise<UrlRow[]> {
  let query: string = 'SELECT * FROM url ORDER BY'
  if (orderBy != null) {
    let count = 0
    for (const [key, value] of Object.entries(orderBy)) {
      query += (count++ > 0 ? ', ' : ' ') + key + ' ' + (value as string)
    }
  } else {
    query += ' created ASC'
  }

  if (limit != null && Number.isInteger(limit)) {
    query += ' LIMIT ' + limit.toString()
    if (offset != null && Number.isInteger(offset)) {
      query += ' OFFSET ' + offset.toString()
    }
  }

  query += ';'
  const { results } = await context.env.URLD1.prepare(query).all()
  return results as UrlRow[]
}

/**
 * Get URL count from D1.
 *
 * @param {any} context The request context.
 * @returns {Promise<number>} The number of URLs in D1.
 */
export const getUrlCount = async function (
  context: any,
  orderBy?: object,
  limit?: number,
  offset?: number
): Promise<number> {
  const values = await context.env.URLD1.prepare('SELECT COUNT(*) AS total FROM url;').first()
  return values.total
}

/**
 * Find a database row by short code.
 *
 * @param {string} short   The short code to search for.
 * @param {any}    context The request context.
 * @returns {Promise<UrlRow | null>} The row if found; null if not.
 */
export const getRowByShortCode = async function (short: string, context: any): Promise<UrlRow | null> {
  const ps = context.env.URLD1.prepare('SELECT * FROM url WHERE short = ?1;').bind(short)
  const row = await ps.first()
  return row
}
