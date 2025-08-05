import React from "react";

const RequestCard = ({ details }) => {
  const { firstName, lastName, age, photoUrl,about } = details;
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
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
