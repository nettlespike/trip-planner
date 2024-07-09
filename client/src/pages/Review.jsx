import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";

export default Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get("http://localhost:8800/review");
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReview();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      <div className="pois">
        {reviews.map((reviews) => (
          <div key={reviews.rno} className="poi">
            <div className="name">
              <a href = {poi.reservation_details}>{poi.name}</a>
            </div>
            <div className="attr">
              <p>{poi.days_of_week}</p>
              <p>{poi.time}</p>
              <p>{poi.address}</p>
              <p>{poi.reservation_required}</p>
             {/* <p>{poi.location}</p>  }
             {/* <p>{poi.accessibility}</p> */}
            </div>
            <div className="but">
              <button className="delete" onClick={() => handleDeleteReq(poi.pid)}>Delete</button>
              <button className="update">
                <Link to={`/update/${poi.pid}`} style={{ color: "inherit", textDecoration: "none" }}>
                  Update
                </Link>
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};