export async function loadTemplate(templatePath: string): Promise<string> {
  const response = await fetch(templatePath);
  return response.text();
}
