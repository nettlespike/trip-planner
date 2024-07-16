import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Add from "./pages/Add";
import Pois from "./pages/Pois";
import Update from "./pages/Update";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pois />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:pid" element={<Update />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
