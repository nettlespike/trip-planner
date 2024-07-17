import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Pois from "./pages/Pois";
import Update from "./pages/Update";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddReview from "./pages/AddReview";
import "./style.css"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", 
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/poi",
        element: <Pois />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/update/:pid",
        element: <Update />,
      },
      {
        path: "/addReview",
        element: <AddReview />,
      },
    ],
  },
  
]);

// function App() {
//   return (
//     <div className="app">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Pois />} />
//           <Route path="/add" element={<Add />} />
//           <Route path="/update/:pid" element={<Update />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
