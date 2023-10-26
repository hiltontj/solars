import { AppDate } from "../../domain/dates";
import { PlanetName } from "../../domain/planets";
import { Tagged } from "../../domain/types";

export type Action =
  | UpdateDate
  | SetPlanetShow
  | GoToToday
  | ToggleDisplayOptions
  | TogglePlanetNames
  | ToggleOrbitalLines;

export type UpdateDate = Tagged<"UpdateDate"> & {
  date: AppDate;
};

export type SetPlanetShow = Tagged<"SetPlanetShow"> & {
  name: PlanetName;
  show: boolean;
};

export type GoToToday = Tagged<"GoToToday">;
export type ToggleDisplayOptions = Tagged<"ToggleDisplayOptions">;
export type TogglePlanetNames = Tagged<"TogglePlanetNames">;
export type ToggleOrbitalLines = Tagged<"ToggleOrbitalLines">;
