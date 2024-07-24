import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const location = useLocation(); // Added useLocation to get the current route

  return (
    <div className="navbar">
      <div className="container">
        <div className="links">
          {currentUser ? (
            <div className="login">
              <span>{"Hello, "+ currentUser?.username + "!   "}</span>
              <span onClick={logout}>Logout</span>
            </div>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}
          {currentUser?.isAdmin ? 
            <span className="home"><Link className={location.pathname === '/' ? 'home active' : 'home'} to="/">Customer Home Page</Link></span> : 
            <span className="home"><Link className={location.pathname === '/' ? 'home active' : 'home'} to="/">Home Page</Link></span>
          }
          <span className="review"><Link className={location.pathname === '/review' ? 'link active' : 'link'} to="/review">View all reviews</Link></span>
          {!(currentUser?.isAdmin) ? 
            <span className="schedule"><Link className={location.pathname === '/schedule' ? 'schedule active' : 'schedule'} to="/schedule">My Schedule</Link></span> : 
            null
          }
          {currentUser?.isAdmin ?
            <span className="manage"><Link className={location.pathname === '/poi' ? 'manage active' : 'manage'} to="/poi">Manage POIs</Link></span> : 
            null
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
