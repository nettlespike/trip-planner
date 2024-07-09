import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Add from "./pages/Add";
import Pois from "./pages/Pois";
import Update from "./pages/Update";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pois />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:pid" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
