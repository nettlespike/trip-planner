import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [poi, setPoi] = useState({
    pid: null,
    name: "",
    days_of_week: "",
    time: "",
    address: "",
    reservation_details: "",
    reservation_required: null,
    location: "",
    accessibility: "",
  });
  // const [error,setError] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname.split("/")[2])

  const pId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setPoi((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(poi)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/poi/" + pId, poi);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      // setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Update the POI</h1>
      <input type="text" placeholder="name" name="name" onChange={handleChange}/>
      <input type="text" placeholder="days_of_week" name="days_of_week" onChange={handleChange}/>
      <input type="text" placeholder="time" name="time" onChange={handleChange}/>
      <input type="text" placeholder="address" name="address" onChange={handleChange}/>
      <input type="text" placeholder="reservation_details" name="reservation_details" onChange={handleChange}/>
      <input type="number" placeholder="reservation_required" name="reservation_required" onChange={handleChange}/>
      <input type="text" placeholder="location" name="location" onChange={handleChange}/>
      <input type="text" placeholder="accessibility" name="accessibility" onChange={handleChange}/>
      <button onClick={handleClick}>Update</button>
      {/* {error && "Something went wrong!"} */}
      <Link to="/">See all POIs</Link>
    </div>
  );
};

export default Update;