import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'

const Review = () => {
  const [pois, setPois] = useState([]); // reviews
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const fetchAllPois = async () => {
      try {
        const res = await axios.get("http://localhost:8800/review");
        setPois(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPois();
  }, []);

  const handleExpRating = async (e) => {
    setRating(e);
    try {
      const res = await axios.get(`http://localhost:8800/review/${rating}`);
      setPois(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <div className="filter_container">
        <p>Experience rating is at least: </p>
        <Rating onClick={handleExpRating}/>
      </div>
      <div className="pois">
        {pois.map((poi) => (
          <div key={poi.rno} className="poi">
            <div className="attr">
              <p>Restaurant code: {poi.poi_code}</p>
              <p>Date: {poi.date}</p>
              <p>Experience: {poi.experience_rating}</p>
              <p>Revisit: {poi.would_revisit_rating}</p>
              <p>Comment: {poi.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;