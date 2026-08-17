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
      className="storefront-card relative flex flex-col items-center gap-5 p-5 sm:flex-row"
    >
      <div className="relative h-28 w-28 shrink-0 bg-pearl p-3">
        <Image
          src={product.images[0]?.url || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="border border-mist object-contain"
        />
      </div>

      <div className="w-full flex-1 space-y-2">
        <p
          className="cursor-pointer font-display text-xl font-semibold leading-tight text-ink transition hover:text-laurel"
          title={product.name}
          onClick={() => router.push(`/products/${product._id}`)}
        >
          {product.name.length > 40
            ? product.name.slice(0, 40) + "..."
            : product.name}
        </p>
        <p className="font-semibold text-laurel">${product.price}</p>
        <div className="flex items-center gap-2">
          <label
            htmlFor={`qty-${product._id}`}
            className="text-sm text-ink/60"
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
            className="storefront-focus w-16 border border-mist bg-white py-1 text-center text-sm"
          />
        </div>
      </div>

      <button
        onClick={() => onDelete(product._id)}
        className="storefront-focus absolute right-3 top-3 p-1 text-ink/45 transition hover:text-red-700"
      >
        <RxCross2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;
