import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, fetchCartList } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface AddToCartProps {
  productId: string;
  quantity: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, quantity }) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const isAddedToCart = cart.some((c) => c.product._id === productId);

  const handleAddToCart = async () => {
    if (isAddedToCart) return;
    setIsLoading(true);

    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
      await dispatch(fetchCartList());
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAddedToCart) {
    return <div>Added to cart</div>;
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
