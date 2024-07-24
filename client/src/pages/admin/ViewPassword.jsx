import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Password = () => {
  const [user, setUser] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {currentUser?.isAdmin ?
        <div className="pois">
          {user.map((user) => (
            <div key={user.uid} className="row">
              <div className="attr">
                <p>uid: {user.uid}</p>
                <p>username: {user.username}</p>
                <p>email: {user.email}</p>
                <p>password: {user.password}</p>
                <p>isAdmin: {user.isAdmin}</p>
                <p>isStoreOwner: {user.isStoreOwner}</p>
              </div>
            </div>
          ))}
        </div>
        : <p>You are not authorized on this page.</p>
      }
    </div>
  );
};

export default Password;