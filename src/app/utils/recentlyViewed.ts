const RECENTLY_VIEWED_STORAGE_KEY = "beauty-shop-recently-viewed";
const MAX_RECENTLY_VIEWED_ITEMS = 8;

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function parseIds(value: string | null): number[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is number =>
        typeof item === "number" && Number.isInteger(item) && item > 0
    );
  } catch {
    return [];
  }
}

export function getRecentlyViewedProductIds(): number[] {
  if (!canUseStorage()) return [];

  return parseIds(window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY));
}

export function addRecentlyViewedProductId(productId: number) {
  if (!canUseStorage()) return;

  if (!Number.isInteger(productId) || productId <= 0) return;

  const currentIds = getRecentlyViewedProductIds();

  const nextIds = [
    productId,
    ...currentIds.filter((id) => id !== productId),
  ].slice(0, MAX_RECENTLY_VIEWED_ITEMS);

  window.localStorage.setItem(
    RECENTLY_VIEWED_STORAGE_KEY,
    JSON.stringify(nextIds)
  );
}