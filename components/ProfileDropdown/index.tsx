"use client";
import React, { useState } from "react";
import styles from "./ProfileDropdown.module.css";
import useOutsideClick from "@/hooks/useOutsideClick";

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(()=> setShowDropdown(false));

  return (
    <div className="relative" ref={ref}>
      <p className={styles.profilePic} onClick={()=> setShowDropdown(!showDropdown)}>MH</p>
      {showDropdown && (
        <ul className={styles.profileBox} >
          <li>Profile</li>
          <li>Change password</li>
          <li>Log out</li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
