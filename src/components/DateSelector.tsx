import { useDate, useUpdateDay, useUpdateMonth, useUpdateYear } from "../context/AppContext/hooks";

const DateSelector = () => {
  const { year, month, day } = useDate();
  const updateDay = useUpdateDay();
  const updateMonth = useUpdateMonth();
  const updateYear = useUpdateYear();

  return (
    <div>
      <div>
        <label htmlFor="d-sel-year">Year</label>
        <input
          id="d-sel-year"
          type="number"
          value={year}
          onChange={({ target: { value }}) => updateYear(parseInt(value))}
        />
      </div>
      <div>
        <label htmlFor="d-sel-month">Month</label>
        <input
          id="d-sel-month"
          type="number"
          value={month}
          onChange={({ target: { value }}) => updateMonth(parseInt(value))}
        />
      </div>
      <div>
        <label htmlFor="d-sel-day">Day</label>
        <input
          id="d-sel-day"
          type="number"
          value={day}
          onChange={({ target: { value }}) => updateDay(parseInt(value))}
        />
      </div>
    </div>
  )
}

export default DateSelector;