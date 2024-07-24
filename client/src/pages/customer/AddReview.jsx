import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddReview = () => {
  const [poi, setPoi] = useState({
    experience_rating: "",
    would_revisit_rating: "",
    comment: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPoi((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/review", poi);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Review</h1>
      <input type="number" placeholder="experience_rating (1 to 5)" name="experience_rating" min="1" max="5" onChange={handleChange}></input>
      <input type="number" placeholder="would_revisit_rating (1 to 5)" name="would_revisit_rating" min="1" max="5" onChange={handleChange}></input>
      <textarea rows="4" cols="50" placeholder="comment" onChange={handleChange}/>
      <button onClick={handleClick}>Submit</button>
      {error && "Something went wrong!"}
      <Link to="/">See all POIs</Link>
    </div>
  );
};

export default AddReview;