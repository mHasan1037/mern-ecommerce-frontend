"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToWishList, fetchWishlist } from "@/redux/slices/wishListSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AddWishListProps {
  id: string;
}

const AddWishList: React.FC<AddWishListProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { wishlist, error } = useAppSelector(
    (state) => state.wishlist
  );
  const { isAuthenticated } = useAppSelector((state ) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);


  const handleWishListPost = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();
    try {
      if(!isAuthenticated){
        toast.error('You need to login first!');
        return;
      }
      setIsLoading(true);
      await dispatch(addToWishList(id)).unwrap();
      await dispatch(fetchWishlist()); 
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    } finally{
      setIsLoading(false);
    }
  };

  const addedToWishlist = wishlist.some((list) => list._id === id);

  if(!isAuthenticated){
    return <button onClick={(e) => handleWishListPost(e, id)}>Add Wishlist</button>
  }

  if (error) return <h1>Error...{error}</h1>;

  return addedToWishlist ? (
    <p>Added to wishlist</p>
  ) : (
    <button onClick={(e) => handleWishListPost(e, id)}>{isLoading ? 'Adding...' : 'AddWishList'}</button>
  );
};

export default AddWishList;
