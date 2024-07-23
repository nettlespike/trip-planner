import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Password = () => {
  // const [user, setUser] = useState({
  //   email: "",
  // });
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState([]);

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8800/searchuser", user);
      // const res = await axios.get(`http://localhost:8800/searchuser/${user}`);
      setQuery(res.data);
      console.log(query)
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="form">
      <h1>Password</h1>
      {/* <input type="text" placeholder="username" name="username" onChange={handleChange}/> */}
      <input type="text" placeholder="email" name="email" onChange={handleChange}/>
      <button onClick={handleClick}>Check</button>
      <p>{query}</p>
      {/* {error && "Something went wrong!"} */}
      <Link to="/">See all POIs</Link>
    </div>
  );
};

export default Password;