import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import React from 'react'
import { toast } from 'react-toastify';

interface AddToCartProps {
    productId: string;
    quantity: number;
}

const AddToCart: React.FC<AddToCartProps> = ({productId, quantity}) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () =>{
        dispatch(addToCart({productId, quantity}))
        .unwrap()
        .then(()=> toast.success("Added to cart!"))
        .catch((err) => console.error(err));
    }
  return (
    <div onClick={handleAddToCart}>AddToCart</div>
  )
}

export default AddToCart