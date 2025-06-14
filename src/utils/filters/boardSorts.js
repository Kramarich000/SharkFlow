export function sortByTitleAsc(boards) {
  return [...boards].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByTitleDesc(boards) {
  return [...boards].sort((a, b) => b.title.localeCompare(a.title));
}

export function sortByCreatedAsc(boards) {
  return [...boards].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );
}
export function sortByCreatedDesc(boards) {
  return [...boards].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}

export function sortByUpdatedAsc(boards) {
  return [...boards].sort(
    (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
  );
}
export function sortByUpdatedDesc(boards) {
  return [...boards].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
}

export function sortByTaskCountAsc(boards) {
  return [...boards].sort(
    (a, b) => (a.tasks?.length || 0) - (b.tasks?.length || 0),
  );
}
export function sortByTaskCountDesc(boards) {
  return [...boards].sort(
    (a, b) => (b.tasks?.length || 0) - (a.tasks?.length || 0),
  );
}
