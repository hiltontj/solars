export const PLANET_NAMES = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
] as const;
export type PlanetName = typeof PLANET_NAMES[number];

export const N_PLANETS = PLANET_NAMES.length;