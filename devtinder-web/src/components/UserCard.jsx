// import React,{useState} from 'react'
// import axios from 'axios'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch } from 'react-redux'
// import {removeUserFromFeed} from '../utils/feedSlice'

// const UserCard = ({user}) => {

//   const {_id,firstName, lastName, photoUrl, age, gender, about, skills} = user
//   const skillsString = typeof skills === 'string' ? skills : "";
//   const dispatch = useDispatch()

//   const handleSendRequest = async (status,userId) => {
//     try{
//       const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials:true})
//       dispatch(removeUserFromFeed(userId))
//     }
//     catch(err)
//     {
//       console.log(err)
//     }
//   }

//   return (

//         <div className="card w-96 bg-neutral-content shadow-xl">
//           <figure>
//             <img
//               src={photoUrl}
//               alt="" />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">{firstName + " " + lastName }</h2>
//             { age && gender && <p>{age + ", " + gender}</p>}
//             <p>{about}</p>
//             <div className="card-actions justify-start">
//               <div className="">{skillsString.split(",").map(skill => skill.trim()).join(" | ")}</div>
//               </div>
//             <div className="card-actions justify-end my-4">
//               <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored",_id)}>Ignore</button>
//               <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default UserCard

import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const skillsString = typeof skills === "string" ? skills : "";
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  // Swipe handlers
  const handleSwipeLeft = () => {
    handleSendRequest("ignored", _id);
  };

  const handleSwipeRight = () => {
    handleSendRequest("interested", _id);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional: allows mouse swiping for testing
  });

  return (
    <div
      {...swipeHandlers}
      className="card w-96 bg-neutral-content shadow-xl relative"
    >
      <figure>
        <img src={photoUrl} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-start">
          <div className="">
            {skillsString
              .split(",")
              .map((skill) => skill.trim())
              .join(" | ")}
          </div>
        </div>
        <div className="card-actions justify-end my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <FontAwesomeIcon icon={faArrowRight} /> Interested
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
        <div className="text-red-500">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
        <div className="text-green-500">
          <FontAwesomeIcon icon={faArrowRight} size="2x" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
