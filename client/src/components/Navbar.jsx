import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="links">
          <span>{"Hello, "+ currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}
          {currentUser?.isAdmin ? 
            <span className="home"><Link className="home" to="/">Customer Home Page</Link></span> : 
            <span className="home"><Link className="home" to="/">Home Page</Link></span>
          }
          <span className="write"><Link className="link" to="/review">View all reviews</Link></span>
          {currentUser?.isAdmin ?
            <span className="manage"><Link className="manage" to="/poi">Manage POIs</Link></span> : 
            null
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
