import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">No Connections Found</h2>
        </div>
      </div>
    );

  return (
    <div className="">
      <div className="text-center my-10 w-1/2 mx-auto">
        <h1 className="text-center my-2 text-4xl font-bold">Connections</h1>
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = connection;
          return (
            <div
              key={_id}
              className="m-4 p-4 shadow-lg bg-base-300 rounded-lg flex"
            >
              <div className="">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                  alt={firstName}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p className="">{age + "," + gender}</p>}
                <p className="">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
