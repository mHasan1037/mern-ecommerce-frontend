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
  const { wishlist, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const { isAuthenticated } = useAppSelector((state ) => state.auth);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(()=> {
     if(wishlist.find((list) => list._id === id)){
      setIsAdded(true);
     }
  }, [wishlist, id]);



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
      await dispatch(addToWishList(id)).unwrap();
      setIsAdded(true);
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  if(!isAuthenticated){
    return <button onClick={(e) => handleWishListPost(e, id)}>Add Wishlist</button>
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...{error}</h1>;

  return isAdded ? (
    <p>Added to wishlist</p>
  ) : (
    <button onClick={(e) => handleWishListPost(e, id)}>AddWishList</button>
  );
};

export default AddWishList;
