import { blake3 } from '@noble/hashes/blake3'
import { bytesToHex } from '@noble/hashes/utils'
import { isHttpsUri } from 'valid-url'
import { DEFAULT_SHORT_CODE_LENGTH, RESERVED_CODES } from './const'

/**
 * Generate a short code from a long URL.
 *
 * @param {string} long      The long URL.
 * @param {any}    [context] The request context.
 * @returns {Promise<string>} The short code.
 */
export const generateShortCode = async function (long: string, shortCodeEnvLength?: number): Promise<string> {
  const shortCodeLength: number = shortCodeEnvLength != null ? shortCodeEnvLength : DEFAULT_SHORT_CODE_LENGTH
  return bytesToHex(blake3(long)).substring(0, shortCodeLength)
}

/**
 * Test if a URL is valid.
 *
 * @param {string} url The URL to test.
 * @returns {boolean} True if valid; false if not.
 */
export const isValidUrl = function (url: string): boolean {
  const checkVal = isHttpsUri(url)
  return checkVal !== null && checkVal === url
}

/**
 * Test if a Short Code is valid.
 *
 * @param {string} code The short code to test.
 * @returns {boolean} True if valid; false if not.
 */
export const isValidShortCode = function (code: string): boolean {
  // Only a-z, A-Z, 0-9, and - are allowed.
  return code.length > 0 && !RESERVED_CODES.includes(code) && !/[^a-z0-9-]/gim.test(code)
}
