export function timestampToReadableDate(timestamp) {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
  });
}
