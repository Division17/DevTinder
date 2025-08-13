import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../store/RequestsSlice"
import { URI } from "../utils/Constants";
import RequestsCard from './RequestsCard'

const Requests = () => {
  const dispatch = useDispatch();
  dispatch(removeRequests());
  const requests = useSelector((store) => store.requests);
  console.log(requests)
    useEffect(() => {
      if (!requests) fetchConnections();
    }, []);
  
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${URI}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data?.requests));
    } catch (error) {
      console.log(error);
    }
  };



  return !requests ? (
    <div className="flex justify-center m-10 flex-col items-center">
      <h2 className="text-2xl font-bold"> Requests</h2>
      <div>
        <h2>You have no Connection Requests.</h2>
      </div>
    </div>
  ) : (
    <div className="flex justify-center m-10 flex-col items-center">
      <h2 className="text-2xl font-bold"> Requests </h2>
      <div className="mt-10 flex flex-col justify-center items-center gap-8">
        {requests &&
          requests.map((card) => (
            <RequestsCard key={card._id} details={card} />
          ))}
      </div>
    </div>
  );
};

export default Requests;
