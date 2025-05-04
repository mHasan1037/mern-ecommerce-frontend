"use client"
import React, { useEffect, useState } from "react";
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
import { fetchCartList } from "@/redux/slices/cartSlice";
import { useDebounce } from "@/utils/useDebounce";
import { setSearchTerm } from "@/redux/slices/productSlice";

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
  const {wishlist, loading: loadingWishlist, error: wishlistError} = useAppSelector((state) => state.wishlist);
  const {cart, loading: loadingCart, error: cartError} = useAppSelector((state) => state.cart)
  const [searchValue, setSearchValue] = useState<string>();
  const debouncedSearch = useDebounce(searchValue, 400)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
      dispatch(fetchCartList())
    }
    if(debouncedSearch){
      dispatch(setSearchTerm(debouncedSearch.trim()));
    }
  }, [dispatch, isAuthenticated, debouncedSearch]);

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
          value={searchValue}
          onChange={(e)=> {
            setSearchValue(e.target.value)
            router.push('/')
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchValue(searchValue)
              router.push('/')
            }
          }}
          className={styles.searchBox}
          type="text"
          placeholder="Search for a product or brand"
        />
      </div>
      <div className="flex gap-5">
        <div className={styles.wishlist} onClick={()=> router.push('/wishlist')}>
          <div className="relative">
            <span className={styles.count}>{loadingWishlist ? "..." : wishlist.length > 0 ? wishlist.length : "0"}</span>
            <CiHeart size={24} />
          </div>{" "}
          Wishlist
        </div>
        <div className={styles.cart} onClick={()=> router.push('/cart')}>
          <div className="relative">
            <span className={styles.count}>{loadingCart ? "..." : cart && cart.length > 0 ? cart.length : "0"} </span>
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
