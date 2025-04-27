import { useAppDispatch } from "@/redux/hooks";
import { addToWishList } from "@/redux/slices/wishListSlice";
import axiosInstance from "@/utils/axiosInstance";
import React from "react";
import { toast } from "react-toastify";

interface AddWishListProps {
  id: string;
}

const AddWishList: React.FC<AddWishListProps> = ({ id }) => {
    const dispatch = useAppDispatch();
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
  return (
    <button onClick={(e) => handleWishListPost(e, id)}>AddWishList</button>
  );
};

export default AddWishList;
