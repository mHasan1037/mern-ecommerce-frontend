"use client";
import React, { useState } from "react";
import styles from "./ProfileDropdown.module.css";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { resetWishlist } from "@/redux/slices/wishListSlice";

const ProfileDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setShowDropdown(false));
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const route = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/user/logout", null, {
        withCredentials: true,
      });
      dispatch(logout());
      dispatch(resetWishlist());
      route.push("/");
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed, try again");
    }
  };

  return (
    <div className="relative" ref={ref}>
      <p
        className={styles.profilePic}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {user?.name
          ? user.name
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()
          : "👤"}
      </p>
      {showDropdown && (
        <ul className={styles.profileBox}>
          <li onClick={()=> {route.push('/account/profile'); setShowDropdown(false)}}>Profile</li>
          <li onClick={()=> {route.push('/account/change-password'); setShowDropdown(false)}}>Change password</li>
          <li onClick={()=> {route.push('/account/all_orders'); setShowDropdown(false)}}>My Orders</li>
          <li onClick={handleLogout}>Log out</li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
