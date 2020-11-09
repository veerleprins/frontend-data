// Fetching the response from the url with d3 and return
// it as a json type:
export async function fetchData(url) {
  return await d3.json(url);
}