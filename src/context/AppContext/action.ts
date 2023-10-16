import { AppDate } from "../../domain/dates";
import { PlanetName } from "../../domain/planets";
import { Tagged } from "../../domain/types";

export type Action = UpdateYear | UpdateDate | SetPlanetShow;

export type UpdateYear = Tagged<"UpdateYear"> & {
  year: number;
};

export function isUpdateYear(x: Action): x is UpdateYear {
  return x.tag === "UpdateYear";
}

export type UpdateDate = Tagged<"UpdateDate"> & {
  date: AppDate;
};

export function isUpdateDate(x: Action): x is UpdateDate {
  return x.tag === "UpdateDate";
}

export type SetPlanetShow = Tagged<"SetPlanetShow"> & {
  name: PlanetName;
  show: boolean;
};

export function isSetPlanetShow(x: Action): x is SetPlanetShow {
  return x.tag === "SetPlanetShow";
}
