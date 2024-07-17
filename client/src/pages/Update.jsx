import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname.split("/")[2])

  const pId = location.pathname.split("/")[2];
  
/*

  const [poi, setPoi] = useState({
    pid: null,
    name: "test",
    days_of_week: "",
    time: "3",
    address: "",
    reservation_details: "",
    reservation_required: 0,
    location: "",
    accessibility: "",
  });

  useEffect(() => {
    const fetchPOI = async () => {
      try {
        const db = await axios.get("http://localhost:8800/poi");
        const q = "SELECT * from poi WHERE pid = ?"
        const d = db.query(q, [pId], (err, data)=> {
          if (err) return db.send(err);
          return db.json(data);
        })

        setPoi((prev) => ({ ...prev, [d.target.name]: d.target.value }))
      } catch (err) {
        console.log(err);
      }
    };
    fetchPOI();
  }, [pId]);
*/
  

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

          <input type="text" placeholder="Restaurant name" name="name" onChange={handleChange}/>
          {/*<input type="text" placeholder="days of the week" name="days_of_week" onChange={handleChange}/>*/}
          <input type="text" placeholder="time" name="time" onChange={handleChange}/>
          <input type="text" placeholder="address" name="address" onChange={handleChange}/>
          <input type="text" placeholder="reservation_details" name="reservation_details" onChange={handleChange}/>
          <input type="number" placeholder="No Reservation Required" name="reservation_required" onChange={handleChange}/>
          {/*<input type="text" placeholder="location" name="location" onChange={handleChange}/>*/}
          <input type="text" placeholder="accessibility" name="accessibility" onChange={handleChange}/>

        <button onClick={handleClick}>Update</button>
        {/* {error && "Something went wrong!"} */}
        <Link to="/">See all POIs</Link>
      
      </div>
  );
};

export default Update;