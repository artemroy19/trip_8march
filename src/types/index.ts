import type { Place } from '../data/places';

export type AppStage = 'loader' | 'gate' | 'boarding' | 'map' | 'finalLetter' | 'bonusNote';

export interface GateCodeState {
  digits: string[];
  error: string | null;
}

export interface ActiveActivityState {
  place: Place;
  completed: boolean;
}

