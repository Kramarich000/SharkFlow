export function filterByTitle(boards, searchTerm) {
  const term = searchTerm.toLowerCase();
  return boards.filter((b) => b.title.toLowerCase().includes(term));
}

export function filterByColor(boards, colorFilter) {
  if (!colorFilter) return boards;
  const c = colorFilter.replace('#', '').toLowerCase();
  return boards.filter((b) => b.color.toLowerCase() === c);
}

export function filterByCreatedDateRange(boards, from, to) {
  if (!from && !to) return boards;
  const f = from ? new Date(from) : new Date(-8640000000000000);
  const t = to ? new Date(to) : new Date(8640000000000000);
  return boards.filter((b) => {
    const d = new Date(b.createdAt);
    return d >= f && d <= t;
  });
}

export function filterByRecentDays(boards, days) {
  if (!days) return boards;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return boards.filter((b) => new Date(b.updatedAt).getTime() >= cutoff);
}

export function filterByFavorites(boards, onlyFav) {
  if (!onlyFav) return boards;
  return boards.filter((b) => b.isFavorite === true);
}
