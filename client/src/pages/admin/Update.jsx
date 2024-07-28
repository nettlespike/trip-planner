import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Update = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false)
  const { currentUser } = useContext(AuthContext);
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

  const pId = location.pathname.split("/")[2];
  
  const handleChange = (e) => {
    setPoi((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    // e.preventDefault();
    try {
      await axios.put("http://localhost:8800/poi/" + pId, poi);  // update POI using primary key pid
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(true)
    }
  };

  return (
      <div className="form">
          <h1>Update the POI</h1>
          {/* only admins have access to the form */}
          {currentUser?.isAdmin ?
            <div className="form">
              <input type="text" placeholder="name" name="name" autocomplete="off" onChange={handleChange}/>
              <input type="text" placeholder="time" name="time" autocomplete="off" onChange={handleChange}/>
              <input type="text" placeholder="address" name="address" autocomplete="off" onChange={handleChange}/>
              <input type="text" placeholder="reservation_details" name="reservation_details" autocomplete="off" onChange={handleChange}/>
              <input type="number" placeholder="reservation_required" name="reservation_required" autocomplete="off" onChange={handleChange}/>
              <input type="text" placeholder="accessibility" name="accessibility" autocomplete="off" onChange={handleChange}/>

              <button onClick={handleClick}>Update</button>
              {error && "Something went wrong!"}
              <Link to="/">See all POIs</Link>
            </div>
            : <p>You are not authorized on this page.</p>
          }
      </div>
  );
};

export default Update;