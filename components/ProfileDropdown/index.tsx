"use client";
import React, { useState } from "react";
import styles from "./ProfileDropdown.module.css";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(()=> setShowDropdown(false));
  const dispatch = useDispatch();

  const handleLogout = async () =>{
     try{
        await axiosInstance.post('/api/user/logout', null, {
           withCredentials: true
        });
        dispatch(logout());
        toast.success('Logout successful')
     }catch (error){
        console.error('Logout failed', error);
        toast.error('Logout failed, try again');
     }
  };

  return (
    <div className="relative" ref={ref}>
      <p className={styles.profilePic} onClick={()=> setShowDropdown(!showDropdown)}>MH</p>
      {showDropdown && (
        <ul className={styles.profileBox} >
          <li>Profile</li>
          <li>Change password</li>
          <li onClick={handleLogout}>Log out</li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
