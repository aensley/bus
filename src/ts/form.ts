/**
 * Parses a FormData Object into a JSON object.
 *
 * @param {FormData} formData A FormData object (array of arrays)
 * @returns {object} JSON object
 */
export const convertFormDataToJson = function (formData: FormData): object {
  const output: object = {}
  for (const [key, value] of formData) {
    output[key] = value
  }

  return output
}
