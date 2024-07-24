import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Dialog from "../customer/Dialog";

const Pois = () => {
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
          <div key={poi.pid} className="row">
            {!(poi.reservation_details) ? 
              <div className="name"> {poi.name} </div> : 
              <div className="name"> <a href = {poi.reservation_details}>{poi.name}</a> </div>
            }
            <div className="attr">
              <p>{poi.days_of_week}</p>
              <p>{poi.address}</p>
              <p>{poi.reservation_required}</p>
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
        {dialog.isLoading && (
        <Dialog
          //Update
          namePoi={dialog.namePoi}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
        )}
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