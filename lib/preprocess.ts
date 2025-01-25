// preprocess data based on file extension
export async function preProcessFile(file: File) {
  const parsed = await file.text();

  // return the raw content
  return parsed;
}
