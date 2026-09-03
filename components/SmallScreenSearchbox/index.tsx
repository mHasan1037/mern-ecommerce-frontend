"use client";
import React, { useState } from "react";
import styles from "./MobileSearchbox.module.css";
import { IoSearchOutline } from "react-icons/io5";
import useOutsideClick from "@/hooks/useOutsideClick";

interface SmallScreenSearchboxProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SmallScreenSearchbox = ({
  searchValue,
  setSearchValue,
}: SmallScreenSearchboxProps) => {
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setShowSearchbox(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default SmallScreenSearchbox;
