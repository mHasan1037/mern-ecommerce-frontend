"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchWishlist } from "@/redux/slices/wishListSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const WishList = () => {
  const dispatch = useAppDispatch();
  const { wishlist, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error}</h1>;
  return (
    <div>
      {wishlist &&
        wishlist.map((list) => {
          return (
            <div key={list._id} className="flex gap-2 items-center">
              <Image
                src={list.images[0]?.url}
                alt={list.name}
                width={50}
                height={50}
              />
              <p>{list.name}</p>
              <p>${list.price}</p>
              <button onClick={() => router.push(list._id)}>
                View product
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default WishList;
