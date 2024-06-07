export function setUrlParam(key: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, '', url.toString());
}

export function clearUrlParam(key: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.replaceState(null, '', url.toString());
}
