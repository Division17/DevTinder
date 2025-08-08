import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/UserSlice";
import { useNavigate } from 'react-router-dom'
import { URI } from "../utils/Constants";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName:""
  });

  const [isLogin, setIslogin] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const { emailId, password } = formData;
      const resp = await axios.post(`${URI}/login`,{emailId, password}, {
        withCredentials: true,
      });
      dispatch(addUser(resp.data.data))
      navigate('/')
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Something went Wrong.")
    }
  };

    const handleSignup = async () => {
      try {
        const resp = await axios.post(
          `${URI}/signup`,
          formData,
          {
            withCredentials: true,
          }
        );
        dispatch(addUser(resp.data.data));
        navigate("/profile");
      } catch (error) {
        console.log(error);
        setErrorMessage(
          error?.response?.data?.message || "Something went Wrong."
        );
      }
    };


  return (
    <div className="w-screen flex items-center justify-center p-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body flex justify-center items-center gap-4">
          <h2 className="card-title">
            {isLogin ? "Login Page" : "Sign up Page"}
          </h2>
          <div className="flex flex-col gap-4">
            {!isLogin && (
              <>
                <label htmlFor="firstName">First Name: </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="John"
                  className="input"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name: </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Singh"
                  className="input"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </>
            )}

            <label htmlFor="emailId">Email: </label>
            <input
              name="emailId"
              type="text"
              placeholder="abc@gmail.com"
              className="input"
              value={formData.emailId}
              onChange={handleChange}
            />

            <label htmlFor="password">Password: </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <p className="text-red-700 font-bold">{errorMessage}</p>
          )}
          <div className="card-actions flex flex-col justify-between items-center">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignup}>
              {isLogin ? "Login" : "Sign up"}
            </button>
            <p
              className="cursor-pointer"
              onClick={() => {
                setIslogin((value) => !value);
              }}
            >
              {isLogin ? "New User ? Sign up." : "Already registered ? Log in."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
