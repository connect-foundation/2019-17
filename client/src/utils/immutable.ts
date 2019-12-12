export function immutableSplice<T>(idx: number, arr: [T]) {
  return [...arr.slice(idx + 1), ...arr.slice(0, idx - 1)];
}
