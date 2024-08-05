/**
 * Loads a template from the specified path.
 *
 * @param {string} templatePath - The path to the template file.
 * @returns {Promise<string>} A promise that resolves to the content of the template as a string.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function loadTemplate(templatePath: string): Promise<string> {
  const response = await fetch(templatePath);
  return response.text();
}
