"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishList, fetchWishlist } from "@/redux/slices/wishListSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { baseStyle } from "@/app/style";

interface AddWishListProps {
  id: string;
}

const AddWishList: React.FC<AddWishListProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { wishlist, error } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleWishListPost = async (
    event: React.MouseEvent<HTMLButtonElement | SVGElement>,
    id: string
  ) => {
    event.stopPropagation();
    try {
      if (!isAuthenticated) {
        toast.error("You need to login first!");
        return;
      }
      await dispatch(addToWishList(id)).unwrap();
      await dispatch(fetchWishlist());
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  const addedToWishlist = wishlist.some((list) => list._id === id);

  if (error) return <h1>Error...{error}</h1>;

  return addedToWishlist ? (
    <FaHeart
      size={24}
      title="Already in Wishlist"
      className={baseStyle}
    />
  ) : (
    <CiHeart
      size={24}
      title="Add to Wishlist"
      className={baseStyle}
      onClick={(e) => handleWishListPost(e, id)}
    />
  );
};

export default AddWishList;
