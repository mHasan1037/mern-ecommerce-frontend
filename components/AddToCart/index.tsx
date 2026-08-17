import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, fetchCartList } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddToCartProps {
  productId: string;
  quantity: number;
  stock: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, quantity, stock }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const isAddedToCart = cart && cart.some((c) => c.product._id === productId);

  const handleAddToCart = async () => {
    if (isAddedToCart) return;
    if(stock < quantity){
      toast.error(`We only have ${stock} products available in the stock!`)
      return;
    };
    setIsLoading(true);

    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
      await dispatch(fetchCartList());
      toast.success("Added to cart!");
    } catch (error) {
      if ((error = "Refresh token is missing")) {
        toast.error("Login to add to the cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAddedToCart) {
    return <div className="border border-sage/60 bg-mist px-4 py-2 text-center text-sm font-semibold text-laurel">Added to cart</div>;
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="storefront-focus border border-laurel px-4 py-2 text-sm font-semibold text-laurel transition duration-200 hover:bg-laurel hover:text-pearl disabled:cursor-wait disabled:opacity-60"
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
