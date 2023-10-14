import "./App.css";
import DateSelector from "./components/DateSelector";
import { AppProvider } from "./context/AppContext";
import SolarSystem from "./components/SolarSystem";

function App() {
  return (
    <AppProvider>
      <div className="container">
        <DateSelector />
        <SolarSystem width={1000} height={500} />
      </div>
    </AppProvider>
  );
}

export default App;
