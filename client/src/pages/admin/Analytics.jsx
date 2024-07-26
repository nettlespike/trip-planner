import axios from "axios";
import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [obj, setObj] = useState([]);
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8800/analytics");
        setObj(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div>
      <h1>Analytics</h1>
      <div className="pois">
        {obj.map((poi) => (
          <div key={poi.pid} className="row">
            {!(poi.reservation_details) ? 
              <div className="name"> {poi.name} </div> : 
              <div className="name"> <a href = {poi.reservation_details}>{poi.name}</a> </div>
            }
            <div className="attr">
              <p>Location code: {poi.pid}</p>
              <p>Popularity: {poi.popularity}</p>
              <p>Avg revisit rating: {poi.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;