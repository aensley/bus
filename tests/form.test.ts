/**
 * Test Form
 *
 * @group unit
 */

import { convertFormDataToJson } from '../src/ts/form'

describe('convertFormDataToJson()', () => {
  test('must be consistent', () => {
    const input: FormData = new FormData()
    input.append('short', 'a')
    input.append('long', 'b')
    const expectedResult = { short: 'a', long: 'b' }
    expect(convertFormDataToJson(input)).toEqual(expectedResult)
  })
})
