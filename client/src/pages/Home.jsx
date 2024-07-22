import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import { useContext } from "react";
import Slider from '@material-ui/core/Slider';

const Home = () => {
  const [pois, setPois] = useState([]);
  const [checkbox, setCheckbox] = useState([]);
  const [sliderVal, setSliderVal] = useState([]);

  const marks = [
    {value: 1, label: '1',},
    {value: 2, label: '2',},
    {value: 3, label: '3',},
    {value: 4, label: '4',},
    {value: 5, label: '5',}
  ];

  // const { token } = useContext(AuthContext);

  // console.log(token)

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
  }, []);

  console.log(pois);

  const handleAdd = async (pois) => {
    try {
      await axios.post("http://localhost:8800/schedule", pois);
      // await axios.post(`http://localhost:8800/schedule/${pid}`);
      // window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/schedule", pois);
      // var hi = localStorage.getItem("user")
      // console.log(hi)
      // navigate("/");
    } catch (err) {
      console.log(err.response.data);
      // setError(true)
    }
  };

  // filter

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

  const updateSlider = (e) => {
    setCheckbox(e.target.value);
  };

  const handleRating = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:8800/noreservation", sliderVal);
      setPois(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <h1>Trip Planner</h1>
      <div className="filter_container">
        <input type="checkbox" value={1} onChange={clickReservation} checked={checkbox == 1}/> <span>Reservation required</span>
        <input type="checkbox" value={2} onChange={clickNoReservation} checked={checkbox == 2}/> <span>No reservation required</span>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={1} max={5}
          onChange={updateSlider}
        />
        <button onClick={handleRating}>Search</button>
      </div>
      <div className="pois">
        {pois.map((poi) => (
          <div key={poi.pid} className="poi">
            <div className="name">
              <a href = {poi.reservation_details}>{poi.name}</a>
            </div>
            <div className="attr">
              <p>{poi.days_of_week}</p>
              {/*<p>{poi.time}</p>*/}
              <p>{poi.address}</p>
              <p>{poi.reservation_required}</p>
             {/* <p>{poi.location}</p>  }
             {/* <p>{poi.accessibility}</p> */}
            </div>
            <div className="but">
              <button className="add" onClick={handleClick}>Add to Schedule</button>
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