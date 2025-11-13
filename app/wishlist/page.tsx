"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RxCross2 } from "react-icons/rx";
import {
  clearWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishListSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AddToCart from "@/components/AddToCart";
import LoadingScreen from "@/components/LoadingScreen";

const WishList = () => {
  const dispatch = useAppDispatch();
  const { wishlist, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const [productCartQuantity, setProductCartQuantity] = useState<{ [id: string]: number }>({});
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to see your wishlist");
      return;
    }
    dispatch(fetchWishlist());
  }, [dispatch, isAuthenticated]);

  const handleRemoveWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId))
      .unwrap()
      .then(() => {
        toast.success("Removed from wishlist");
      })
      .catch((error) => {
        console.error("Failed to remove from wishlist", error);
      });
  };

  const removeAllWishlist = async () => {
    try {
      await dispatch(clearWishlist()).unwrap();
      toast.success("Wishlist is cleared");
    } catch (error: any) {
      console.error("Failed to clear wishlist", error);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error)
    return <h1 className="text-center text-red-600">Error: {error}</h1>;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((list) => (
              <div
                key={list._id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-md shadow-sm bg-white relative"
              >
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    src={list.images[0]?.url}
                    alt={list.name}
                    fill
                    className="rounded object-cover border"
                  />
                </div>
                <div className="flex-1 space-y-1 w-full">
                  <p
                    className="text-lg font-semibold hover:text-green-500 hover:underline cursor-pointer"
                    title={list.name}
                    onClick={() => router.push(list._id)}
                  >
                    {list.name.length > 40
                      ? list.name.slice(0, 40) + "..."
                      : list.name}
                  </p>
                  <p className="text-green-700 font-medium">${list.price}</p>
                  <p
                    className={`text-sm ${
                      list.stock > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {list.stock > 0 ? "In stock" : "Out of stock"}
                  </p>
                  <div className="flex gap-2 items-center mt-2">
                    <input
                      type="number"
                      value={productCartQuantity[list._id] ?? 1}
                      onChange={(e) => {
                        const newQuantity = Math.max(1, Number(e.target.value)); 
                        setProductCartQuantity((prev) => ({
                          ...prev,
                          [list._id]: newQuantity,
                        }));
                      }}
                      placeholder="1"
                      disabled={
                        cart && cart.some((c) => c.product._id === list._id)
                      }
                      min={1}
                      className={`w-16 px-2 py-1 rounded text-sm outline-none ${
                        cart && cart.some((c) => c.product._id === list._id)
                          ? "cursor-not-allowed border-none"
                          : "border"
                      }`}
                    />
                    <AddToCart
                      productId={list._id}
                      quantity={productCartQuantity[list._id] ?? 1}
                      stock={list.stock}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveWishlist(list._id)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
                >
                  <RxCross2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
              onClick={removeAllWishlist}
            >
              Clear Wishlist
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishList;
