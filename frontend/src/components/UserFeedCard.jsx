import React from "react";

const UserFeedCard = ({ feed }) => {

  const { firstName, lastName, photoUrl, age, about, gender } = feed;

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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;
