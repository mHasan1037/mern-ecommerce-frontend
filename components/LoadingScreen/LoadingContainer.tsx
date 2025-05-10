import React from "react";
import style from "./Loading.module.css";

const LoadingContainer = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center gap-5 w-full">
      <div className="w-full max-w-md bg-gray-300 rounded-full h-4 overflow-hidden">
        <div className={`bg-mainBg2 h-full ${style.progressBar}`}></div>
      </div>
      <div className="flex items-center gap-1 text-mainBg2 font-semibold text-lg">
        <span>Loading</span>
        <span className={style.dot}>.</span>
        <span className={`${style.dot} ${style.dot2}`}>.</span>
        <span className={`${style.dot} ${style.dot3}`}>.</span>
      </div>
    </div>
  );
};

export default LoadingContainer;
