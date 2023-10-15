import { AppDate } from "../../domain/dates";
import { Tagged } from "../../domain/types";

export type Action = UpdateYear | UpdateDate;

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
