import "./App.css";
import Planet from "./components/Planet";
import DateSelector from "./components/DateSelector";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="container">
        <DateSelector />
        <Planet />
      </div>
    </AppProvider>
  );
}

export default App;
