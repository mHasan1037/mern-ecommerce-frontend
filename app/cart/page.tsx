"use client";
import React, { useEffect } from "react";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCart, fetchCartList } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CartItem from "@/components/CartItem/CartItem";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    cart: cartList,
    loading,
    error,
  } = useAppSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      toast.success("Login to see your Cart");
      return;
    }
    dispatch(fetchCartList());
  }, [dispatch, isAuthenticated]);

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId))
      .unwrap()
      .then(() => {
        toast.success("Product is removed from the cart.");
      })
      .catch((error) => {
        console.error("Error deleting product", error);
      });
  };

  if (loading && (!cartList || cartList.length === 0)) return <LoadingScreen />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Cart</h2>
      {cartList && cartList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartList.map((cart) => <CartItem key={cart._id} cart={cart} onDelete={handleDeleteCart}/>)}
          </div>

          <div className="mt-8 text-center">
            <ConfirmButton
              buttonText={"Proceed to Checkout"}
              onclick={() => router.push("/checkout")}
            />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
