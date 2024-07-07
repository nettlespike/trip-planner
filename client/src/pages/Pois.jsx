import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pois = () => {
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

  const handleDelete = async (pid) => {
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
            <div className="name">{poi.name}</div>
            <div className="attr">
              <p>{poi.days_of_week}</p>
              <p>{poi.time}</p>
              <p>{poi.address}</p>
              <p>{poi.reservation_details}</p>
              <p>{poi.reservation_required}</p>
              <p>{poi.location}</p>
              <p>{poi.accessibility}</p>  
            </div>
            <div className="but">
              <button className="delete" onClick={() => handleDelete(poi.pid)}>Delete</button>
              <button className="update">
                <Link to={`/update/${poi.pid}`} style={{ color: "inherit", textDecoration: "none" }}>
                  Update
                </Link>
              </button>
            </div>
            
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new POI
        </Link>
      </button>
    </div>
  );
};

export default Pois;