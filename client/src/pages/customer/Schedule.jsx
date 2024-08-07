import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import { AuthContext } from "../../context/authContext.js";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    namePoi: ""
  });
  const snoRef = useRef();
  const handleDialog = (message, isLoading, namePoi) => {
    setDialog({
      message,
      isLoading,
      namePoi
    });
  };

  // users need to confirm before the schedule entry gets deleted
  const handleDeleteReq = (poi) => {
    handleDialog("Are you sure you want to delete?", true, poi.name);
    snoRef.current = poi.sno;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      handleDelete(snoRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  useEffect(() => {
    const fetchAllSchedule = async () => {
      try {
        // console.log(currentUser.uid)
        const res = await axios.get(`http://localhost:8800/schedule/${(currentUser.uid)}`); // get the current user's schedule by uid
        setSchedule(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSchedule();
  }, []);

  const handleDelete = async (sno) => {
    try {
      await axios.delete(`http://localhost:8800/schedule/${sno}`); // delete schedule entry using primary key sno
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Trip Planner</h1>
      <div className="pois">
        {schedule.map((schedule) => (
          <div key={schedule.sno} className="row">
            {!(schedule.reservation_details) ? 
              <div className="name"> {schedule.name} </div> : 
              <div className="name"> <a href = {schedule.reservation_details}>{schedule.name}</a> </div>
            }
            <div className="attr">
              <p>Location code: {schedule.pid}</p>
              <p>Date: {schedule.date}</p>
              <p>Time: {schedule.time}</p>
            </div>
            <div className="but">
              <button className="delete" onClick={() => handleDeleteReq(schedule)}>Delete</button>
              <button className="update">
                <Link to={`/updateSchedule/${schedule.sno}`} style={{ color: "inherit", textDecoration: "none" }}>
                  Update date and time
                </Link>
              </button>
            </div> 
          </div>
        ))}
        {dialog.isLoading && (
        <Dialog
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