"use client";
import React, { useEffect } from "react";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteCart, fetchCartList, updateCartQuantity } from "@/redux/slices/cartSlice";
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
                    <div className="flex items-center gap-2">
                      <label htmlFor={`qty-${product._id}`} className="text-sm text-gray-600">
                        Quantity:
                      </label>
                      <input 
                        id={`qty-${product._id}`}
                        type="number"
                        min="1"
                        value={cart.quantity}
                        onChange={(e) =>{
                          const newQuantity = Number(e.target.value);
                          if(newQuantity > 0){
                            dispatch(updateCartQuantity({ productId: product._id, quantity: newQuantity }))
                            .unwrap()
                            .then(() => toast.success("Cart updated successfully"))
                            .catch(()=> toast.error("Failed to update cart"))
                          }
                        }}
                        className="w-16 border rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
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
