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
    <main className="storefront-page">
      <div className="storefront-shell py-8 md:py-12">
      <h2 className="mb-8 text-center font-display text-4xl font-semibold text-ink">My Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {wishlist.map((list) => (
              <div
                key={list._id}
                className="storefront-card relative flex flex-col items-center gap-5 p-5 sm:flex-row"
              >
                <div className="relative h-28 w-28 shrink-0 bg-pearl p-3">
                  <Image
                    src={list.images[0]?.url}
                    alt={list.name}
                    fill
                    className="border border-mist object-contain"
                  />
                </div>
                <div className="w-full flex-1 space-y-2">
                  <p
                    className="cursor-pointer font-display text-xl font-semibold leading-tight text-ink transition hover:text-laurel"
                    title={list.name}
                    onClick={() => router.push(`products/${list._id}`)}
                  >
                    {list.name.length > 40
                      ? list.name.slice(0, 40) + "..."
                      : list.name}
                  </p>
                  <p className="font-semibold text-laurel">${list.price}</p>
                  <p
                    className={`text-sm ${
                      list.stock > 0 ? "text-laurel" : "text-red-600"
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
                          ? "cursor-not-allowed border border-transparent bg-mist text-ink/50"
                          : "storefront-focus border border-mist bg-white"
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
                  className="storefront-focus absolute right-3 top-3 p-1 text-ink/45 transition hover:text-red-700"
                >
                  <RxCross2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              className="storefront-focus border border-red-700 px-6 py-2 font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
              onClick={removeAllWishlist}
            >
              Clear Wishlist
            </button>
          </div>
        </>
      ) : (
        <p className="border border-mist bg-white/80 p-10 text-center text-ink/60 shadow-boutique-sm">Your wishlist is empty.</p>
      )}
      </div>
    </main>
  );
};

export default WishList;
