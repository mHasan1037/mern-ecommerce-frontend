"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { updateCartQuantity } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
import { CartItem as CartItemType } from "@/types/cart";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/utils/useDebounce";

interface CartItemProps{
    cart: CartItemType;
    stock?: number;
    onDelete: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cart, stock, onDelete }) => {
  const [localQuantity, setLocalQuantity] = useState(cart.quantity);
  const dispatch = useAppDispatch();
  const product = cart.product;
  const router = useRouter();
  if (!product) return null;

  const debounceQuantity = useDebounce(localQuantity, 800);

  useEffect(()=>{
    if(!stock) return;
    if(debounceQuantity === cart.quantity) return;
    if(debounceQuantity > stock){
      toast.warning(`Only ${stock} items available in stock.`);
      setLocalQuantity(stock);
      return;
    }
    
    dispatch(updateCartQuantity({productId: product._id, quantity: debounceQuantity}))
        .unwrap()
        .then(()=> toast.success("Cart updated successfully"))
        .catch(()=> toast.error("Failed to update cart"))
  }, [debounceQuantity, stock])

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
          onClick={() => router.push(`/products/${product._id}`)}
        >
          {product.name.length > 40
            ? product.name.slice(0, 40) + "..."
            : product.name}
        </p>
        <p className="text-green-700 font-medium">${product.price}</p>
        <div className="flex items-center gap-2">
          <label
            htmlFor={`qty-${product._id}`}
            className="text-sm text-gray-600"
          >
            Quantity:
          </label>
          <input
            id={`qty-${product._id}`}
            type="number"
            min="1"
            value={localQuantity}
            onChange={(e) => {
              const newQuantity = Number(e.target.value);
              if(newQuantity >= 1) setLocalQuantity(newQuantity);
            }}
            className="w-16 border rounded text-center text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      <button
        onClick={() => onDelete(product._id)}
        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
      >
        <RxCross2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
