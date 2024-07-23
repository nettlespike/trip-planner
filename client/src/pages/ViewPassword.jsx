import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactSearchBox from "react-search-box";

const Password = () => {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    const fetchAllPois = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setPois(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPois();
  }, []);

  console.log(pois);

  return (
    <div>
      <h1>Users</h1>
      <div className="pois">
        {pois.map((poi) => (
          <div key={poi.uid} className="poi">
            <div className="attr">
              <p>uid: {poi.uid}</p>
              <p>username: {poi.username}</p>
              <p>email: {poi.email}</p>
              <p>password: {poi.password}</p>
              <p>isAdmin: {poi.isAdmin}</p>
              <p>isStoreOwner: {poi.isStoreOwner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Password;