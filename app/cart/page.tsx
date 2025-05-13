"use client";
import React, { useEffect } from "react";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCart, fetchCartList } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

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
      {/* <table className="table-auto w-full border border-gray-300">
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
      </table> */}
      {cartList && cartList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartList.map((cart) => {
              const product = cart.product;
              if (!product) return null;

              return (
                <div
                  key={cart._id || `${product._id}-${cart.quantity}`}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-md shadow-sm bg-white relative"
                >
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={product.images[0]?.url || "/images/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover rounded border"
                    />
                  </div>

                  <div className="flex-1 space-y-1 w-full">
                    <p
                      className="text-lg font-semibold hover:text-green-500 hover:underline cursor-pointer"
                      title={product.name}
                      onClick={() => router.push(`/product/${product._id}`)}
                    >
                      {product.name.length > 40
                        ? product.name.slice(0, 40) + "..."
                        : product.name}
                    </p>
                    <p className="text-green-700 font-medium">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {cart.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteCart(product._id)}
                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
              );
            })}
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
