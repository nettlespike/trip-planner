import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="form">
      <h1>Login</h1>
      <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
      <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
      <button onClick={handleSubmit}>Login</button>
      {err && <p>{err}</p>}
      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>
    </div>
  );
};

export default Login;
