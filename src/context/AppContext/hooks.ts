import React from "react";
import { AppDispatchContext, AppDispatcher, AppStateContext, State } from ".";
import { AppDate, updateDay, updateMonth } from "../../domain/dates";

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
      if (isNaN(month)) {
        return;
      }
      const { date: current } = state;
      (async () => {
        let date = await updateMonth(current, month);
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
      if (isNaN(day)) {
        return;
      }
      const { date: current } = state;
      (async () => {
        let date = await updateDay(current, day);
        dispatch({ tag: "UpdateDate", date });
      })();
    },
    [state.date],
  );
};
