import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import ReactSearchBox from "react-search-box";

const Home = () => {
  const [pois, setPois] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [spid, setSpid] = useState([]);
  const { currentUser, logout } = useContext(AuthContext);
  const [poiUser, setPoiUser] = useState({
    poi: "",
    user: "",
  });

  useEffect(() => {
    const fetchAllPois = async () => {
      try {
        const res = await axios.get("http://localhost:8800/poi");
        setPois(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPois();
    setPoiUser({poi: pois, user: currentUser})
  }, []);

  console.log(pois);

  const handleSchedule = async (e) => {
    // e.preventDefault();
    console.log({poi: e, user: currentUser})
    try {
      await axios.post("http://localhost:8800/schedule", {poi: e, user: currentUser});
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // filters

  const clickReservation = async (e) => {
    try {
      const res = await axios.get("http://localhost:8800/reservation");
      setPois(res.data);
      setCheckbox(e.target.value);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const clickNoReservation = async (e) => {
    try {
      const res = await axios.get("http://localhost:8800/noreservation");
      setPois(res.data);
      setCheckbox(e.target.value);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleSearch = (e) => {
      setSpid(e);
      console.log(spid)
  };

  const handleSearchClick = async (e) => {
    try {
      const res = await axios.get(`http://localhost:8800/search/${spid}`);
      setPois(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleWeekend = async (e) => {
    if (e.target.checked) {
      try {
        const res = await axios.get("http://localhost:8800/weekend");
        setPois(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
    else {
      try {
        const res = await axios.get("http://localhost:8800/poi");
        setPois(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div>
      <h1>POIs</h1>
      <div className="filter_container">
        <input type="checkbox" value={1} onChange={clickReservation} checked={checkbox == 1}/> <span>Reservation required</span>
        <input type="checkbox" value={2} onChange={clickNoReservation} checked={checkbox == 2}/> <span>No reservation required</span>
        <input type="checkbox" onChange={handleWeekend}/> <span>Open weekends</span>
        <ReactSearchBox placeholder="search by id" onChange={handleSearch}/>
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="pois">
        {pois.map((poi) => (
          <div key={poi.pid} className="poi">
            <div className="name">
              <a href = {poi.reservation_details}>{poi.name}</a>
            </div>
            <div className="attr">
              <p>{poi.days_of_week}</p>
              <p>{poi.address}</p>
              <p>{poi.reservation_required}</p>
            </div>
            <div className="but">
              <button className="add" onClick={() => handleSchedule(poi.pid)}>Add to Schedule</button>
              <button className="add">
              <Link to="/addReview" style={{ color: "inherit", textDecoration: "none" }}>
                Add review
              </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;