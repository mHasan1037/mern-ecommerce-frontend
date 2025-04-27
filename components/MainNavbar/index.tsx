"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./MainNavbar.module.css";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from "../ProfileDropdown";
import SmallScreenSearchbox from "../SmallScreenSearchbox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchWishlist } from "@/redux/slices/wishListSlice";

interface NavbarProps {
  setOpenForm: React.Dispatch<
    React.SetStateAction<
      null | "login" | "signup" | "verifyEmail" | "resetPasswordLink"
    >
  >;
}

function MainNavbar({ setOpenForm }: NavbarProps) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {wishlist, loading, error} = useAppSelector((state) => state.wishlist);

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(fetchWishlist())
    }  
  }, [dispatch, isAuthenticated])

  if(loading){
    return <h1>Loading</h1>
  }
  if(error){
    return <h1>Error: {error}</h1>
  }

  return (
    <section className={styles.navbar}>
      <div className="flex items-center">
        <div className="w-20 cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={100}
            onClick={() => router.push("/")}
          />
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
            <span className={styles.count}>{wishlist.length > 0 ? wishlist.length : '0'}</span>
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
        {isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <div className="flex gap-2">
            <p
              onClick={() => setOpenForm(() => "login")}
              className="cursor-pointer hover:text-mainBg2"
            >
              Log In
            </p>{" "}
            /
            <p
              onClick={() => setOpenForm(() => "signup")}
              className="cursor-pointer hover:text-mainBg2"
            >
              Sign up
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MainNavbar;
