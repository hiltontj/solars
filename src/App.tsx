import DateSelector from "./components/DateSelector";
import { AppProvider } from "./context/AppContext";
import SolarSystem from "./components/SolarSystem";
import Title from "./components/Title";
import Options from "./components/Options";

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <div className="item-side">
          <Title />
          <DateSelector />
          <Options />
        </div>
        <div className="item-main">
          <SolarSystem width={800} height={600} />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
