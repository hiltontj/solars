import React from "react";
import * as Actions from './action';
import { AppDate } from "../../util/dates";

export type State = {
  date: AppDate;
}

const initialize = (): State => ({
  date: {
    year: 2021,
    month: 3,
    day: 20,
  },
})

const reducer = (state: State, action: Actions.Action): State => {
  switch(action.tag) {
    case 'UpdateDate': {
      return { ...state, date: action.date };
    }
    case 'UpdateYear': {
      return { ...state, date: { ...state.date, year: action.year } };
    }
  }
}

export const AppStateContext = React.createContext<State | null>(null)

export type AppDispatcher = React.Dispatch<Actions.Action>
export const AppDispatchContext = React.createContext<AppDispatcher | null>(null)

type AppProviderProps = {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialize());

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}