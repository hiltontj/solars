import React from "react";
import {
  useDate,
  useGoToToday,
  useUpdateDay,
  useUpdateMonth,
  useUpdateYear,
} from "../context/AppContext/hooks";

type State = {
  day: string;
  month: string;
  year: string;
};

type Action = {
  type: "update_day" | "update_month" | "update_year";
  value: string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update_day": {
      return { ...state, day: action.value };
    }
    case "update_month": {
      return { ...state, month: action.value };
    }
    case "update_year": {
      return { ...state, year: action.value };
    }
  }
};

const DateSelector = () => {
  const appDate = useDate();
  const updateDay = useUpdateDay();
  const updateMonth = useUpdateMonth();
  const updateYear = useUpdateYear();
  const goToToday = useGoToToday();
  const [state, dispatch] = React.useReducer(reducer, {
    day: appDate.day.toString(),
    month: appDate.month.toString(),
    year: appDate.year.toString(),
  });

  React.useEffect(() => {
    const day = parseFloat(state.day);
    if (!isNaN(day)) {
      updateDay(day);
    }
  }, [state.day]);

  React.useEffect(() => {
    const month = parseInt(state.month);
    if (!isNaN(month)) {
      updateMonth(month);
    }
  }, [state.month]);

  React.useEffect(() => {
    const year = parseInt(state.year);
    if (!isNaN(year)) {
      updateYear(year);
    }
  }, [state.year]);

  React.useEffect(() => {
    const appDay = appDate.day.toString();
    if (appDay !== state.day && state.day.length) {
      dispatch({ type: "update_day", value: appDay });
    }
  }, [appDate.day, state.day]);

  React.useEffect(() => {
    const appMonth = appDate.month.toString();
    if (appMonth !== state.month && state.month.length) {
      dispatch({ type: "update_month", value: appMonth });
    }
  }, [appDate.month, state.month]);

  React.useEffect(() => {
    const appYear = appDate.year.toString();
    if (appYear !== state.year && state.year.length) {
      dispatch({ type: "update_year", value: appYear });
    }
  }, [appDate.year, state.year]);

  return (
    <div className="date-container">
      <label className="item-y-label" htmlFor="d-sel-year">
        Year
      </label>
      <input
        id="d-sel-year"
        className="item-y-input d-sel-input"
        type="number"
        value={state.year}
        onChange={({ target: { value } }) =>
          dispatch({ type: "update_year", value })
        }
      />
      <label className="item-m-label" htmlFor="d-sel-month">
        Month
      </label>
      <input
        id="d-sel-month"
        className="item-m-input d-sel-input"
        type="number"
        value={state.month}
        onChange={({ target: { value } }) =>
          dispatch({ type: "update_month", value })
        }
      />
      <label className="item-d-label" htmlFor="d-sel-day">
        Day
      </label>
      <input
        id="d-sel-day"
        className="item-d-input d-sel-input"
        type="number"
        value={state.day}
        onChange={({ target: { value } }) =>
          dispatch({ type: "update_day", value })
        }
        onScroll={(e) => e.stopPropagation()}
      />
      <button className="item-t-button" onClick={goToToday}>
        Today
      </button>
    </div>
  );
};

export default DateSelector;
