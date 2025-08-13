import React from "react";
import { useDispatch } from "react-redux";
import { removeRequests } from "../store/RequestsSlice";
import axios from "axios";
import { URI } from "../utils/Constants";

const RequestCard = ({ details }) => {
  const dispatch = useDispatch()
  const { firstName, lastName, age, photoUrl, about } = details.fromUserId;

  const handleRequest = async (status,id) => {
    try {
      const response = await axios.post(`${URI}/request/review/${status}/${id}`,{},{withCredentials:true});
      dispatch(removeRequests(id))
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <div className="card card-side bg-base-300 shadow-sm h-50 w-auto">
      <figure>
        <img
          src={
            photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          }
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age}</p>
        <p>{about}</p>
        <div className="flex card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleRequest("ignored", details._id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleRequest("accepted", details._id);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
