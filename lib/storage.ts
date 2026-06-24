export function getStorage<T>(
  key: string,
  fallback: T
): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const item = localStorage.getItem(key);

  return item
    ? JSON.parse(item)
    : fallback;
}

export function setStorage(
  key: string,
  value: unknown
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}