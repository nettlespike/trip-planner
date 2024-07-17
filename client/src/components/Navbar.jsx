import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
// import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="links">
          <Link className="link" to="/?cat=art"><h6>Filter1</h6></Link>
          <Link className="link" to="/?cat=science"><h6>Filter2</h6></Link>
          <Link className="link" to="/?cat=technology"><h6>Filter3</h6></Link>
          <span>{"Hello, "+ currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}
          <span className="home"><Link className="home" to="/">Clear filters</Link></span>
          <span className="write"><Link className="link" to="/review">View all reviews</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
