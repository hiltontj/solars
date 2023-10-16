import { useOptions, useTogglePlanetNames } from "../context/AppContext/hooks";
import Toggle from "./Toggle";

const Options = () => {
  const { planetNames } = useOptions();
  const togglePlanetNames = useTogglePlanetNames();

  return (
    <div className="options-container">
      <h3 className="options-title">Settings</h3>
      <Toggle
        id="toggle-planet-names"
        className="options-toggle"
        checked={planetNames}
        onClick={togglePlanetNames}
      />
      <label htmlFor="toggle-planet-names" className="options-label">
        Planet Names
      </label>
    </div>
  );
};

export default Options;
