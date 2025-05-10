"use client";
import React from "react";
import style from "./Loading.module.css";
import LoadingContainer from "./LoadingContainer";

const LoadingScreen = () => {
  return (
    <div className={style.mainContainer}>
      <LoadingContainer />
    </div>
  );
};

export default LoadingScreen;
