import React, { useEffect, useState } from "react";
import UserFeedCard from "./UserFeedCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URI } from "../utils/Constants";
import { addFeed } from "../store/FeedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${URI}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-auto py-10">
      {feed && <UserFeedCard feed={feed} />}
      {errorMessage && (
        <h2 className="text-red-500 font-bold text-xl">{errorMessage}</h2>
      )}
    </div>
  );
};

export default Feed;
