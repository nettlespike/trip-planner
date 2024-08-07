import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/poi/auth/register", inputs); // create new user
      setError(false)
      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <input required type="text" placeholder="username" name="username" autocomplete="off" onChange={handleChange}/>
      <input required type="email" placeholder="email" name="email" autocomplete="off" onChange={handleChange}/>
      <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
      <button onClick={handleClick}>Register</button>
      {error && "Something went wrong!"}
      <span> Do you have an account? <Link to="/login">Login</Link> </span>
      <Link to="/">See all POIs</Link>
    </div>
  );
};

export default Register;