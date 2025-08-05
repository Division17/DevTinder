import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/ConnectionsSlice";
import { URI } from "../utils/Constants";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    if (connection) return;
    try {
      const response = await axios.get(`${URI}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return !connection ? (
    <div className="flex justify-center m-10 flex-col items-center">
      <h2 className="text-2xl font-bold"> Connections</h2>
      <div>
        <h2>You have no Connection.</h2>
      </div>
    </div>
  ) : (
    <div className="flex justify-center m-10 flex-col items-center">
      <h2 className="text-2xl font-bold"> Connections</h2>
              <div className="mt-10 flex flex-col gap-4 justify-center">{
                  connection && (
                      connection.map(card => <ConnectionCard key={card._id} details={card } />) 
                  )
              }</div>
    </div>
  );
};

export default Connections;
