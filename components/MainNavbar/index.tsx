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
import { resetStates } from "@/utils/resetStates";
import { openAuthForm } from "@/redux/slices/uiSlice";
import Link from "next/link";


function MainNavbar() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {wishlist, loading: loadingWishlist, error: wishlistError} = useAppSelector((state) => state.wishlist);
  const {cart, loading: loadingCart, error: cartError} = useAppSelector((state) => state.cart)
  const [searchValue, setSearchValue] = useState<string>("");
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
    <section className={styles.storefrontNavbar}>
      <div className="flex items-center">
        <Link
          href="/"
          onClick={() => dispatch(resetStates())}
          className={
            "w-24 cursor-pointer transition duration-200 hover:opacity-80"
          }
        >
          <Image src="/images/logo.png" alt="Logo" width={200} height={100} />
        </Link>
        <SmallScreenSearchbox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="hidden md:block">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            router.push("/");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchValue(searchValue);
              router.push("/");
            }
          }}
          className={styles.storefrontSearchBox}
          type="text"
          placeholder="Search for a product or brand"
        />
      </div>
      <div
        className={
          "flex items-center gap-2 text-sm font-semibold text-ink/80 sm:gap-4"
        }
      >
        <Link href={"/wishlist"} className={styles.storefrontNavAction}>
          <div className="relative">
            <span className={styles.count}>
              {loadingWishlist
                ? "..."
                : wishlist.length > 0
                  ? wishlist.length
                  : "0"}
            </span>
            <CiHeart size={24} />
          </div>{" "}
          Wishlist
        </Link>
        <Link href="/cart" className={styles.storefrontNavAction}>
          <div className="relative">
            <span className={styles.count}>
              {loadingCart
                ? "..."
                : cart && cart.length > 0
                  ? cart.length
                  : "0"}{" "}
            </span>
            <CiShoppingCart size={24} />
          </div>{" "}
          Cart
        </Link>
        {isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <div className={"flex items-center gap-2 border-l border-mist pl-3"}>
            <p
              onClick={() => dispatch(openAuthForm({ form: "login" }))}
              className={
                "storefront-focus cursor-pointer px-2 py-1 transition duration-200 ease-out hover:text-laurel hover:scale-105"
              }
            >
              Log In
            </p>{" "}
            /
            <p
              onClick={() => dispatch(openAuthForm({ form: "signup" }))}
              className={
                "storefront-focus cursor-pointer px-2 py-1 transition duration-200 ease-out hover:text-laurel hover:scale-105"
              }
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
