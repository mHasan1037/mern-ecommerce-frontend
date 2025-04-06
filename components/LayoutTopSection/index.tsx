"use client"
import React, { useEffect, useState } from "react";
import LayoutForms from "../LayoutForms";
import MainNavbar from "../MainNavbar";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

const LayoutTopSection = () => {
  const [openForm, setOpenForm] = useState<null | "login" | "signup" | "verifyEmail" | "resetPasswordLink">(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(loadUser());
  }, [dispatch]);


  return (
    <div>
      <LayoutForms openForm={openForm} setOpenForm={setOpenForm}/>
      <MainNavbar setOpenForm={setOpenForm} />
      <ToastContainer position="bottom-left"/>
    </div>
  );
};

export default LayoutTopSection;
