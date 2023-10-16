import React from "react";
import { AppDispatchContext, AppDispatcher, AppStateContext, State } from ".";
import { AppDate, updateDay, updateMonth } from "../../domain/dates";
import { AppPlanet, PlanetName } from "../../domain/planets";
import { AppOptions } from "../../domain/options";

const useAppState = (): State => {
  const state = React.useContext(AppStateContext);
  if (state === null || state === undefined) {
    throw new Error(
      "useAppState must be called within a valid AppStateContext.Provider",
    );
  }
  return state;
};

const useAppDispatcher = (): AppDispatcher => {
  const dispatch = React.useContext(AppDispatchContext);
  if (dispatch === null || dispatch === undefined) {
    throw new Error(
      "useAppDispatcher must be called within a valid AppDispatchContext.Provider",
    );
  }
  return dispatch;
};

export const useDate = (): AppDate => {
  const state = useAppState();
  return state.date;
};

export const useUpdateYear = (): ((year: number) => void) => {
  const dispatch = useAppDispatcher();
  return React.useCallback(
    (year: number) => dispatch({ tag: "UpdateYear", year }),
    [],
  );
};

export const useUpdateMonth = (): ((month: number) => void) => {
  const state = useAppState();
  const dispatch = useAppDispatcher();
  return React.useCallback(
    (month: number) => {
      const { date: current } = state;
      (async () => {
        const date = await updateMonth(current, month);
        dispatch({ tag: "UpdateDate", date });
      })();
    },
    [state.date],
  );
};

export const useUpdateDay = (): ((day: number) => void) => {
  const state = useAppState();
  const dispatch = useAppDispatcher();
  return React.useCallback(
    (day: number) => {
      const { date: current } = state;
      (async () => {
        const date = await updateDay(current, day);
        dispatch({ tag: "UpdateDate", date });
      })();
    },
    [state.date],
  );
};

export const usePlanets = (): AppPlanet[] => {
  const state = useAppState();
  return state.planets;
};

export const useShowPlanet = (name: PlanetName): ((show: boolean) => void) => {
  const dispatch = useAppDispatcher();
  return React.useCallback(
    (show: boolean) => dispatch({ tag: "SetPlanetShow", name, show }),
    [],
  );
};

export const useGoToToday = (): (() => void) => {
  const dispatch = useAppDispatcher();
  return React.useCallback(() => dispatch({ tag: "GoToToday" }), []);
};

export const useOptions = (): AppOptions => {
  const state = useAppState();
  return state.options;
};

export const useTogglePlanetNames = (): (() => void) => {
  const dispatch = useAppDispatcher();
  return React.useCallback(() => dispatch({ tag: "TogglePlanetNames" }), []);
};
