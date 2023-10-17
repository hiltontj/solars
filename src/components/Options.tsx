import {
  useOptions,
  useToggleOrbitalLines,
  useTogglePlanetNames,
} from "../context/AppContext/hooks";
import Toggle from "./Toggle";

const Options = () => {
  const { planetNames, orbitalLines } = useOptions();
  const togglePlanetNames = useTogglePlanetNames();
  const toggleOrbitalLines = useToggleOrbitalLines();

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
      <Toggle
        id="toggle-orbital-lines"
        className="options-toggle"
        checked={orbitalLines}
        onClick={toggleOrbitalLines}
      />
      <label htmlFor="toggle-orbital-lines" className="options-label">
        Orbital Lines
      </label>
    </div>
  );
};

export default Options;
