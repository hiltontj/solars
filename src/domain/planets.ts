export const PLANET_NAMES = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
] as const;
export type PlanetName = (typeof PLANET_NAMES)[number];

export const N_PLANETS = PLANET_NAMES.length;

export const getPlanetColor = (planet: PlanetName): string => {
  switch (planet) {
    case "Earth":
      return "#61a8ff";
    default:
      return "#dbdbdb";
  }
};

export const getPlanetRadius = (planet: PlanetName): number => {
  switch (planet) {
    case "Mercury":
      return 4;
    case "Jupiter":
      return 10;
    case "Saturn":
    case "Mars":
    case "Venus":
      return 6;
    default:
      return 8;
  }
};
