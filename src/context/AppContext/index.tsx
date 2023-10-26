import React from "react";
import * as Actions from "./action";
import { AppDate, today } from "../../domain/dates";
import { AppPlanet, PLANET_NAMES } from "../../domain/planets";
import { AppOptions } from "../../domain/options";

export type State = {
  date: AppDate;
  planets: AppPlanet[];
  displayOptions: boolean;
  options: AppOptions;
};

const initialize = (): State => ({
  date: today(),
  planets: PLANET_NAMES.map((name) => ({
    name,
    show: true,
  })),
  displayOptions: false,
  options: {
    planetNames: false,
    orbitalLines: true,
  },
});

const reducer = (state: State, action: Actions.Action): State => {
  switch (action.tag) {
    case "UpdateDate": {
      return { ...state, date: action.date };
    }
    case "GoToToday": {
      return {
        ...state,
        date: today(),
      };
    }
    case "SetPlanetShow": {
      const { name, show } = action;
      return {
        ...state,
        planets: state.planets.map((p) =>
          p.name === name
            ? {
                ...p,
                show,
              }
            : {
                ...p,
              },
        ),
      };
    }
    case "TogglePlanetNames": {
      return {
        ...state,
        options: { ...state.options, planetNames: !state.options.planetNames },
      };
    }
    case "ToggleDisplayOptions": {
      return { ...state, displayOptions: !state.displayOptions };
    }
    case "ToggleOrbitalLines": {
      return {
        ...state,
        options: {
          ...state.options,
          orbitalLines: !state.options.orbitalLines,
        },
      };
    }
  }
};

export const AppStateContext = React.createContext<State | null>(null);

export type AppDispatcher = React.Dispatch<Actions.Action>;
export const AppDispatchContext = React.createContext<AppDispatcher | null>(
  null,
);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialize());

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
