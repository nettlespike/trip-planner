import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateSchedule = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [poi, setPoi] = useState({
    sno: null,
    date: "",
    time: "",
    cus_no: "",
    pid: "",
  });
  const [error,setError] = useState(false)

  const sno = location.pathname.split("/")[2];
  
  const handleChange = (e) => {
    setPoi((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/schedule/" + sno, poi);
      navigate("/schedule");
    } catch (err) {
      console.log(err.response.data);
      setError(true)
    }
  };

  return (
      <div className="form">
    
          <h1>Update the date and time</h1>
          <input type="date" placeholder="date" name="date" onChange={handleChange}/>
          <input type="time" placeholder="time" name="time" onChange={handleChange}/>

        <button onClick={handleClick}>Update</button>
        {error && "Something went wrong!"}
        <Link to="/">See all POIs</Link>
      
      </div>
  );
};

export default UpdateSchedule;