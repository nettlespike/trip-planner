import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Add = () => {
  const [poi, setPoi] = useState({
    name: "",
    days_of_week: "",
    time: "",
    address: "",
    reservation_details: "",
    reservation_required: null,
    location: "",
    accessibility: "",
  });
  const [error, setError] = useState(false)
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPoi((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/poi", poi); // add POI to database
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New POI</h1>
      {/* only admins have access to the form */}
      {currentUser?.isAdmin ?
        <div className="form">
          <input type="text" placeholder="name" name="name" autocomplete="off" onChange={handleChange}/>
          <input type="text" placeholder="days_of_week" name="days_of_week" autocomplete="off" onChange={handleChange}/>
          <input type="text" placeholder="time" name="time" autocomplete="off" onChange={handleChange}/>
          <input type="text" placeholder="address" name="address" autocomplete="off" onChange={handleChange}/>
          <input type="text" placeholder="reservation_details" name="reservation_details" autocomplete="off" onChange={handleChange}/>
          <input type="number" placeholder="reservation_required" name="reservation_required" onChange={handleChange}/>
          <input type="text" placeholder="accessibility" name="accessibility" autocomplete="off" onChange={handleChange}/>
          <button onClick={handleClick}>Add</button>
          {error && "Something went wrong!"}
          <Link to="/">See all POIs</Link>
        </div>
        : <p>You are not authorized on this page.</p>
      }
    </div>
  );
};

export default Add;