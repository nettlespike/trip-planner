import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); // current user info stored in local storage
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
          {/* Show home page for everyone, but the text in the nav bar depends on the user type */}
          <span className="home"><Link className={location.pathname === '/' ? 'home active' : 'home'} to="/">{currentUser?.isAdmin ? "Customer Home Page" : "Home Page"}</Link></span>
          {/* Show review page for everyone */}
          <span className="review"><Link className={location.pathname === '/review' ? 'link active' : 'link'} to="/review">View all reviews</Link></span>
          {/* Show schedule in navbar if user is a customer. Admins still have access to the page, but it won't show up in the nav bar. */}
          {!(currentUser?.isAdmin) ? 
            <span className="schedule"><Link className={location.pathname === '/schedule' ? 'schedule active' : 'schedule'} to="/schedule">My Schedule</Link></span> : 
            null
          }
          {/* Show analytics page for everyone */}
          <span className="analytics"><Link className={location.pathname === '/analytics' ? 'analytics active' : 'analytics'} to="/analytics">Analytics</Link></span> 
          {/* Show manage page for admins */}
          {currentUser?.isAdmin ?
              <span className="manage"><Link className={location.pathname === '/poi' ? 'manage active' : 'manage'} to="/poi">Manage POIs</Link></span> : 
            null
          }
          {/* Show user info page for admins */}
          {currentUser?.isAdmin ?
              <span className="users"><Link className={location.pathname === '/users' ? 'users active' : 'users'} to="/users">Users</Link></span> : 
            null
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
