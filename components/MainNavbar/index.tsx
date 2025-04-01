import React from "react";
import Image from "next/image";
import styles from "./MainNavbar.module.css";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from "../ProfileDropdown";
import SmallScreenSearchbox from "../SmallScreenSearchbox";

function MainNavbar() {
  return (
    <section className={styles.navbar}>
      <div className="flex items-center">
        <div className="w-20 cursor-pointer">
          <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
        </div>
        <SmallScreenSearchbox />
      </div>
      <div className="hidden md:block">
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search for a product or brand"
        />
      </div>
      <div className="flex gap-5">
        <div className={styles.wishlist}>
          <div className="relative">
            <span className={styles.count}>0</span>
            <CiHeart size={24} />
          </div>{" "}
          Wishlist
        </div>
        <div className={styles.cart}>
          <div className="relative">
            <span className={styles.count}>0</span>
            <CiShoppingCart size={24} />
          </div>{" "}
          Cart
        </div>
        {/*
        user who is not logged in will see it
        <div className="flex gap-2">
          <p>Log In</p> /
          <p>Sign up</p>
        </div> */}
        {/*logged in user will see the profileDropdown*/}
        <ProfileDropdown />
      </div>
    </section>
  );
}

export default MainNavbar;
