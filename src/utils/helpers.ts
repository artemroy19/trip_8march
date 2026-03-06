export type Anchor = [number, number];

export type MarkerPayload = unknown;

export interface MarkerClickArgs<TPayload = MarkerPayload> {
  event: MouseEvent;
  anchor: Anchor;
  payload: TPayload;
}

export type MarkerOnClick<TPayload = MarkerPayload> = (args: MarkerClickArgs<TPayload>) => void;

export interface MarkerTheme {
  color: string;
  emoji: string;
}

export const PINK_MARKER: MarkerTheme = { color: '#ffb6c1', emoji: '❤' };
export const GOLD_MARKER: MarkerTheme = { color: '#ffd97d', emoji: '✶' };

export function getMarkerTheme(visited: boolean): MarkerTheme {
  return visited ? GOLD_MARKER : PINK_MARKER;
}

