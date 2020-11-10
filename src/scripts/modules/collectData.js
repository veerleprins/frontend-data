// Fetching the response from the url with d3 and return
// it as a json type:
export async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}