"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RxCross2 } from "react-icons/rx";
import { clearWishlist, fetchWishlist, removeFromWishlist } from "@/redux/slices/wishListSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddToCart from "@/components/AddToCart";

const WishList = () => {
  const dispatch = useAppDispatch();
  const { wishlist, loading, error } = useAppSelector(
    (state) => state.wishlist
  );
  const [productCartQuantity, setProductCartQuantity] = useState(1)
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveWishlist = (productId: string) =>{
    dispatch(removeFromWishlist(productId))
    .unwrap()
    .then(()=>{
      toast.success('Removed from wishlist')
    })
    .catch((error) =>{
      console.error("Failed to remove from wishlist", error)
    })
  }

  const removeAllWishlist = async () =>{
    try{
      await dispatch(clearWishlist()).unwrap();
      toast.success("Wishlist is cleared");
    }catch(error: any){
      console.error('Failed to clear wishlist',  error)
    }
  }

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error: {error}</h1>;
  return (
    <div>
      <button className="bg-green-400 p-2" onClick={removeAllWishlist}>Clear wishlist</button>
      {wishlist &&
        wishlist.map((list) => {
          return (
            <div key={list._id} className="flex gap-2 items-center">
              <Image
                src={list.images[0]?.url}
                alt={list.name}
                width={50}
                height={50}
              />
              <p>{list.name}</p>
              <p>${list.price}</p>
              <p>{list.stock > 0 ? 'In stock' : 'Out of stock'}</p>
              <button onClick={() => router.push(list._id)}>
                View product
              </button>
              <div>
                <input 
                   type="number"
                   value={productCartQuantity}
                   onChange={(e)=> setProductCartQuantity(Number(e.target.value))}
                   placeholder="1"
                   min={1}
                />
                <AddToCart productId={list._id} quantity={productCartQuantity}/>
              </div>
              <RxCross2 onClick={()=> handleRemoveWishlist(list._id)}/>
            </div>
          );
        })}
    </div>
  );
};

export default WishList;
