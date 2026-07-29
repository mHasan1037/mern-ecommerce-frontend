"use client"
import React, { useEffect, useState } from "react";
import LayoutForms from "../LayoutForms";
import MainNavbar from "../MainNavbar";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";

const LayoutTopSection = () => {
  const openForm = useSelector((state: RootState) => state.ui.openForm);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(loadUser());
  }, [dispatch]);


  return (
    <div>
      <LayoutForms openForm={openForm}/>
      <MainNavbar/>
      <ToastContainer position="bottom-left"/>
    </div>
  );
};

export default LayoutTopSection;
