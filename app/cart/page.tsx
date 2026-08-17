"use client";
import React, { useEffect, useState } from "react";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCart, fetchCartList } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CartItem from "@/components/CartItem/CartItem";
import { fetchProductById } from "@/redux/slices/productSlice";

const Cart = () => {
  const [productStocks, setProductStocks] = useState<{ [key: string]: number }>({});
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
    dispatch(fetchCartList())
      .unwrap()
      .then(async (cart) => {
        for (const item of cart) {
          const res = await dispatch(
            fetchProductById(item.product._id)
          ).unwrap();
          setProductStocks((prev) => ({
            ...prev,
            [res._id]: res.stock,
          }));
        }
      });
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
    <main className="storefront-page">
      <div className="storefront-shell py-8 md:py-12">
      <h2 className="mb-8 text-center font-display text-4xl font-semibold text-ink">My Cart</h2>
      {cartList && cartList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {cartList.map((cart) => (
              <CartItem
                key={cart._id}
                cart={cart}
                stock={productStocks[cart.product._id]}
                onDelete={handleDeleteCart}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ConfirmButton
              buttonText={"Proceed to Checkout"}
              onclick={() => router.push("/checkout")}
            />
          </div>
        </>
      ) : (
        <p className="border border-mist bg-white/80 p-10 text-center text-ink/60 shadow-boutique-sm">Your cart is empty.</p>
      )}
      </div>
    </main>
  );
};

export default Cart;
