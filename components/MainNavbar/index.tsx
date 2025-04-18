import React from "react";
import Image from "next/image";
import styles from "./MainNavbar.module.css";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from "../ProfileDropdown";
import SmallScreenSearchbox from "../SmallScreenSearchbox";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

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
