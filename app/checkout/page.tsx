"use client";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCartList } from "@/redux/slices/cartSlice";
import { postSingleOrder } from "@/redux/slices/orderSlice";
import { fetchProductById } from "@/redux/slices/productSlice";
import { orderItem, shippingInfo } from "@/types/order";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialShippingInfo = {
    fullName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    phone: "",
}

const Checkout = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const dispatch = useAppDispatch();
  const [orderItems, setOrderItems] = useState<orderItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<shippingInfo>(initialShippingInfo)
  const [isDirectOrder, setIsDirectOrder] = useState(false);

  useEffect(() => {
    if (productId) {
      setIsDirectOrder(true);
      dispatch(fetchProductById(productId))
        .then((res) => {
          const product = res.payload;
          setOrderItems([
            {
              productId: product._id,
              quantity: parseInt(quantity || "1"),
              price: product.price,
              name: product.name,
              image: product.images?.[0].url,
            },
          ]);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      dispatch(fetchCartList()).then((res) => {
        const cart = res.payload || [];
        const formatted = cart.map((item: any) => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          name: item.product.name,
          image: item.product.images?.[0]?.url || "",
        }));
        setOrderItems(formatted);
      });
    }
  }, []);

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity , 0);

  const handleShippingInfo = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    setShippingInfo((prev)=>({
        ...prev,
        country: "Bangladesh",
        [name]: value
    }));
  }

  const handlePlaceOrder = () =>{
    if(isDirectOrder){
        dispatch(postSingleOrder({
            productId: productId as string,
            quantity: parseInt(quantity as string),
            totalAmount,
            shippingInfo
        }))
        .unwrap()
        .then(()=>{
            toast.success("Order placed successfully!")
        })
        .catch((err) =>{
            toast.error("Failed to place order: ", err)
        })
    }
  }

  return <div>
    <div>
        {orderItems.map((item) =>(
            <div className="flex gap-3">
                <p>Name: {item.name}</p>
                <Image src={item.image} alt={item.name} width={50} height={50}/>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
            </div>
        ))}
    </div>
    <div>
        <h1>Total price: <span>${totalAmount}</span></h1>
    </div>
    <h1>Add your shipping address:</h1>
    <form>
        <div className="flex gap-2">
            <p>Name:</p>
            <input type="text" placeholder="Name" name="fullName" value={shippingInfo.fullName} onChange={handleShippingInfo}/>
        </div>
        <div className="flex gap-2">
            <p>Address:</p>
            <input type="text" placeholder="Address" name="address" value={shippingInfo.address} onChange={handleShippingInfo}/>
        </div>
        <div className="flex gap-2">
            <p>City:</p>
            <input type="text" placeholder="City" name="city" value={shippingInfo.city} onChange={handleShippingInfo}/>
        </div>
        <div className="flex gap-2">
            <p>Post code:</p>
            <input type="number" placeholder="Post code" name="postCode" value={shippingInfo.postCode} onChange={handleShippingInfo}/>
        </div>
        <div className="flex gap-2">
            <p>Phone:</p>
            <input type="number" placeholder="Phone" name="phone" value={shippingInfo.phone} onChange={handleShippingInfo}/>
        </div>
    </form>
    <button onClick={handlePlaceOrder}>Place order</button>
  </div>;
};

export default Checkout;
