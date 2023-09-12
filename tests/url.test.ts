/**
 * Test URL
 *
 * @group unit
 */

import { generateShortCode, isValidShortCode, isValidUrl } from '../src/ts/url'

describe('generateShortCode()', () => {
  test('should be consistent', async () => {
    const tests = {
      e66b: 'https://andrewensley.com',
      cbdf: 'https://github.com/aensley',
      b337: 'https://stackoverflow.com/users/20801',
      '23f5': 'https://www.linkedin.com/in/andrewensley',
      '6efe': 'https://app.pluralsight.com/profile/andrew-ensley'
    }
    for (const shortCode in tests) {
      expect(await generateShortCode(tests[shortCode])).toEqual(shortCode)
    }
  })
})

describe('isValidUrl()', () => {
  test('must validate correctly', () => {
    const tests = {
      'https://andrewensley.com': true,
      'https://github.com/aensley': true,
      'https://stackoverflow.com/users/20801': true,
      'https://www.linkedin.com/in/andrewensley': true,
      'https://app.pluralsight.com/profile/andrew-ensley': true,
      // Treat HTTP as invalid.
      // Why: https://https.cio.gov/everything/
      // HTTPS is already everywhere: https://www.eff.org/deeplinks/2021/09/https-actually-everywhere
      'http://bad.com': false,
      's:bad/bad.bad': false,
      'file://bad': false,
      'ftp://bad': false
    }
    for (const url in tests) {
      expect(isValidUrl(url)).toEqual(tests[url])
    }
  })
})

describe('isValidShortCode()', () => {
  test('must validate correctly', () => {
    const tests = {
      a: true,
      'b-B-1': true,
      '2222': true,
      CCCC: true,
      'no-slash/d': false,
      'inval!d ch@racter$': false,
      url: false, // reserved word
      '': false // too short
    }
    for (const shortCode in tests) {
      expect(isValidShortCode(shortCode)).toEqual(tests[shortCode])
    }
  })
})
