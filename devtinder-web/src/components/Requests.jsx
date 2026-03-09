import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">No Requests Found</h2>
        </div>
      </div>
    );

  return (
    <div className="">
      <div className="text-center my-10 w-5/6 mx-auto">
        <h1 className="text-center my-2 text-4xl font-bold">Requests</h1>
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = request.fromUserId;
          return (
            <div
              key={_id}
              className="m-4 p-4 shadow-lg bg-base-300 rounded-lg flex justify-between items-center"
            >
              <div className="">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                  alt={firstName}
                />
              </div>
              <div className="text-left mx-4 flex-grow">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p className="">{age + "," + gender}</p>}
                <p className="max-h-15 overflow-hidden">{about}</p>
              </div>
              <div className="">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
