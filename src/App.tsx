import DateSelector from "./components/DateSelector";
import { AppProvider } from "./context/AppContext";
import SolarSystem from "./components/SolarSystem";
import Title from "./components/Title";
import Options from "./components/Options";
import SettingsButton from "./components/SettingsButton";
import { useDisplayOptions } from "./context/AppContext/hooks";

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <div className="item-nav">
          <SettingsButton />
        </div>
        <div className="item-side">
          <SidePane />
        </div>
        <div className="item-main">
          <SolarSystem width={800} height={600} />
        </div>
      </div>
    </AppProvider>
  );
}

const SidePane = () => {
  const displayOptions = useDisplayOptions();

  return (
    <>
      <Title />
      {displayOptions ? <Options /> : <DateSelector />}
    </>
  );
};

export default App;
