"use client";
import React, { useState } from "react";
import styles from "./MobileSearchbox.module.css";
import { IoSearchOutline } from "react-icons/io5";
import useOutsideClick from "@/hooks/useOutsideClick";

const SmallScreenSearchbox = () => {
  const [showSearchbox, setShowSearchbox] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setShowSearchbox(false));
  return (
    <div className="block md:hidden relative" ref={ref}>
      <IoSearchOutline
        size={24}
        onClick={() => setShowSearchbox(true)}
        className="cursor-pointer"
      />
      {showSearchbox && (
        <input
          className={styles.mobileSearchBox}
          type="text"
          placeholder="Search for a product or brand"
        />
      )}
    </div>
  );
};

export default SmallScreenSearchbox;
