import {
  useDate,
  useUpdateDay,
  useUpdateMonth,
  useUpdateYear,
} from "../context/AppContext/hooks";

const DateSelector = () => {
  const { year, month, day } = useDate();
  const updateDay = useUpdateDay();
  const updateMonth = useUpdateMonth();
  const updateYear = useUpdateYear();

  return (
    <div className="date-container">
      <label className="item-y-label" htmlFor="d-sel-year">
        Year
      </label>
      <input
        id="d-sel-year"
        className="item-y-input d-sel-input"
        type="number"
        value={year}
        onChange={({ target: { value } }) => updateYear(parseInt(value))}
        onScroll={(e) => console.debug(e)}
      />
      <label className="item-m-label" htmlFor="d-sel-month">
        Month
      </label>
      <input
        id="d-sel-month"
        className="item-m-input d-sel-input"
        type="number"
        value={month}
        onChange={({ target: { value } }) => updateMonth(parseInt(value))}
        onScroll={(e) => console.debug(e)}
      />
      <label className="item-d-label" htmlFor="d-sel-day">
        Day
      </label>
      <input
        id="d-sel-day"
        className="item-d-input d-sel-input"
        type="number"
        value={day}
        onChange={({ target: { value } }) => updateDay(parseInt(value))}
        onScroll={(e) => console.debug(e)}
      />
    </div>
  );
};

export default DateSelector;
