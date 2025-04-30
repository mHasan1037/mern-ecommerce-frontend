"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCartList } from "@/redux/slices/cartSlice";
import Image from "next/image";
import React, { useEffect } from "react";

const cart = () => {
  const dispatch = useAppDispatch();
  const { cart: cartList, loading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartList());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>
    <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((cart) => (
            <tr key={cart.product._id} className="border-t">
              <td className="px-4 py-2 border">
                <Image
                  src={cart.product.images[0]?.url}
                  alt={cart.product.name}
                  width={80}
                  height={80}
                />
              </td>
              <td className="px-4 py-2 border">{cart.product.name}</td>
              <td className="px-4 py-2 border">${cart.product.price}</td>
              <td className="px-4 py-2 border">{cart.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>;
};

export default cart;
