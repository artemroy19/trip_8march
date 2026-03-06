export function getImagePath(path: string): string {
  const base = import.meta.env.MODE === 'production' ? '/trip_on_8march' : '';
  return `${base}${path}`;
}