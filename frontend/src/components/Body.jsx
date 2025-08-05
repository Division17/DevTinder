import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/UserSlice";
import axios from "axios";
import { URI } from "../utils/Constants";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const resp = await axios.get(`${URI}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(resp.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  },[])
    
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
