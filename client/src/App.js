import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Add from "./pages/admin/Add";
import Pois from "./pages/admin/Pois";
import Update from "./pages/admin/Update";
import Password from "./pages/admin/ViewPassword";
import Analytics from "./pages/admin/Analytics";

import Home from "./pages/customer/Home";
import Register from "./pages/customer/Register";
import Login from "./pages/customer/Login";
import Review from "./pages/customer/Review";
import AddReview from "./pages/customer/AddReview";
import Schedule from "./pages/customer/Schedule";
import UpdateSchedule from "./pages/customer/UpdateSchedule";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.css"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
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
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/users",
        element: <Password />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/updateSchedule/:sno",
        element: <UpdateSchedule />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
    ],
  },
  
]);

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
