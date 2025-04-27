"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishList, fetchWishlist } from "@/redux/slices/wishListSlice";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface AddWishListProps {
  id: string;
}

const AddWishList: React.FC<AddWishListProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { wishlist, loading, error } = useAppSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleWishListPost = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    try {
      await dispatch(addToWishList(id)).unwrap();
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...{error}</h1>;

  return wishlist.find((list) => list._id === id) ? (
    <p>Added to wishlist</p>
  ) : (
    <button onClick={(e) => handleWishListPost(e, id)}>AddWishList</button>
  );
};

export default AddWishList;
