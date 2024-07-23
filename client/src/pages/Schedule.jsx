import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";

const Schedule = () => {
  const [pois, setPois] = useState([]);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    namePoi: ""
  });
  const idPoiRef = useRef();
  const handleDialog = (message, isLoading, namePoi) => {
    setDialog({
      message,
      isLoading,
      //Update
      namePoi
    });
  };

  const handleDeleteReq = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idPoiRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      handleDelete(idPoiRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  useEffect(() => {
    const fetchAllPois = async () => {
      try {
        const res = await axios.get("http://localhost:8800/schedule");
        setPois(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPois();
  }, []);

  console.log(pois);

  const handleDelete = async (sno) => {
    try {
      await axios.delete(`http://localhost:8800/schedule/${sno}`);
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
          <div key={poi.sno} className="poi">
          <div className="attr">
            <p>Date: {poi.date}</p>
            <p>Time: {poi.time}</p>
            <p>Cus_no (remove): {poi.cus_no}</p>
            <p>pid: {poi.pid}</p>
          </div>
          <div className="but">
            <button className="delete" onClick={() => handleDeleteReq(poi.sno)}>Delete</button>
            <button className="update">
              <Link to={`/updateSchedule/${poi.sno}`} style={{ color: "inherit", textDecoration: "none" }}>
                Update date and time
              </Link>
            </button>
          </div>
            
          </div>
        ))}
        {dialog.isLoading && (
        <Dialog
          //Update
          namePoi={dialog.namePoi}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
        )}
      </div>
    </div>
  );
};

export default Schedule;