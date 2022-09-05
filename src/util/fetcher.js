export async function fetcher(...params) {
  const response = await fetch(params);

  if (response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
  }
  return undefined;
}
