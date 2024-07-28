import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'
import moment from "moment";


const Review = () => {
  const [review, setReview] = useState([]);
  const [rating, setRating] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8800/review");
        setReview(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReviews();
  }, []);

  const handleExpRating = async (e) => {
    setRating(e);
    try {
      const res = await axios.get(`http://localhost:8800/review/${rating}`);
      setReview(res.data);
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
        {review.map((review) => (
          <div key={review.rno} className="row">
            <div className="attr">
              <p>Code: {review.poi_code}</p>
              <p>{review.name}</p>
              <p>Date: {moment(review.date).format('YYYY-MM-DD')}</p>
              <p>Experience: {review.experience_rating}</p>
              <p>Revisit: {review.would_revisit_rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;