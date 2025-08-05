import React from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { removeFeed } from '../store/FeedSlice'
import {URI} from '../utils/Constants'

const UserFeedCard = ({ feed}) => {
  const dispatch = useDispatch()

    
    if (!feed || feed.length <=0) {
      return (
        <div className=" w-screen m-10 flex justify-center items-center">
          <h2 className="font-bold text-2xl">No feed left to show.......</h2>
        </div>
      );
    }



  const { _id, firstName, lastName, photoUrl, age, about, gender } = feed;

  const handleFeed = async(status,id) => {
    try {
       await axios.post(
        `${URI}/request/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id))
    } catch (error) {
      console.log(error)
    }
  }

 return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={
            photoUrl ||
            "https://tse3.mm.bing.net/th/id/OIP.UCL14P68pN74fd8s7TLgZwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
          }
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age && <span>{age}</span>}
          {gender && <span>{", " + gender}</span>}
        </p>
        <p>{about}</p>
        <div className="card-actions justify-center gap-8">
          <button className="btn btn-primary" onClick={()=>{handleFeed("ignored",_id)}}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>{handleFeed("interested",_id)}}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
