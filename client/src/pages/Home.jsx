import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";

const Home = () => {
  const [pois, setPois] = useState([]);

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

  const handleAdd = async (pid) => {
    try {
      await axios.delete(`http://localhost:8800/poi/${pid}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Trip Planner</h1>
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
            <button className="but">
                <Link to="/addReview" style={{ color: "inherit", textDecoration: "none" }}>
                Add review
                </Link>
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;