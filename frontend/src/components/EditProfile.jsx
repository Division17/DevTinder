import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/UserSlice";
import UserFeedCard from "./UserFeedCard";
import axios from "axios";
import { URI } from "../utils/Constants";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
    photoUrl: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        about: user.about,
        photoUrl: user.photoUrl,
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    setErrorMessage("");
    try {
      const response = await axios.patch(`${URI}/profile/edit`, formData, {
        withCredentials: true,
      });
      dispatch(addUser(response?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error?.response?.data?.message || "Something went Wrong."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="w-screen flex items-center justify-center p-10 gap-8">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body flex justify-center items-center gap-4">
            <h2 className="card-title">Edit Profile</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName">First Name: </label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="input"
                value={formData.firstName}
                onChange={handleChange}
              />

              <label htmlFor="lastName">Last Name: </label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
              />

              <label htmlFor="age">Age: </label>
              <input
                name="age"
                type="number"
                min={18}
                placeholder="18 +"
                className="input"
                value={formData.age}
                onChange={handleChange}
              />

              <label htmlFor="gender">Gender: </label>
              <select
                name="gender"
                value={formData.gender}
                className="input"
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="photoUrl">Photo URL</label>
              <input
                type="url"
                name="photoUrl"
                placeholder="photo url"
                className="input"
                value={formData.photoUrl}
                onChange={handleChange}
              />
              <label htmlFor="about">About</label>
              <input
                type="text"
                name="about"
                placeholder="About"
                className="input"
                value={formData.about}
                onChange={handleChange}
              />
            </div>
            <div className="card-actions flex justify-center items-center">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Details
              </button>
            </div>
          </div>
        </div>
        {user && <UserFeedCard feed={formData} />}
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
