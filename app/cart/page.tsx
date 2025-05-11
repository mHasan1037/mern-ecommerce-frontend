"use client";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCart, fetchCartList } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

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
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {cartList
          .map((cart) => {
              if (!cart.product) return null;
              return (
                <tr key={cart._id || `${cart.product?._id}-${cart.quantity}`} className="border-t">
                  <td className="px-4 py-2 border">
                    {cart.product.images[0]?.url ? (
                      <Image
                        src={cart.product.images[0].url}
                        alt={cart.product.name}
                        width={80}
                        height={80}
                      />
                    ) : (
                      <span className="w-[80px] h-[80px] bg-gray-200"></span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{cart.product.name}</td>
                  <td className="px-4 py-2 border">${cart.product.price}</td>
                  <td className="px-4 py-2 border">{cart.quantity}</td>
                  <td
                    className="px-4 py-2 border"
                    onClick={() => cart.product?._id && handleDeleteCart(cart.product._id)}
                  >
                    X
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ConfirmButton buttonText={"Checkout"} onclick={()=> router.push('/checkout')}/>
    </div>
  );
};

export default Cart;
