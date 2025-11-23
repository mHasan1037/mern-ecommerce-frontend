"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart, fetchCartList } from "@/redux/slices/cartSlice";
import { postCartOrders, postSingleOrder } from "@/redux/slices/orderSlice";
import { fetchProductById } from "@/redux/slices/productSlice";
import { CheckoutOrderItem, shippingInfo } from "@/types/order";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./checkout.module.css";

const initialShippingInfo = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postCode: "",
  country: "",
  phone: "",
};

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const dispatch = useAppDispatch();
  const [orderItems, setOrderItems] = useState<CheckoutOrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "SSL">("COD");
  const [shippingInfo, setShippingInfo] =
    useState<shippingInfo>(initialShippingInfo);
  const [isDirectOrder, setIsDirectOrder] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

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
        const formatted = cart
          .filter((item: any) => item.product)
          .map((item: any) => ({
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

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleShippingInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      email: user?.email,
      country: "Bangladesh",
      [name]: value,
    }));
  };

  const validateShipping = () => {
    const { fullName, address, city, postCode, phone } = shippingInfo;

    if (!fullName || !address || !city || !postCode || !phone ) {
      toast.error("Please fill in all shipping fields.");
      return;
    }
    return true;
  };

  const placeCOD = async () => {
    try {
          console.log('the shipping info', shippingInfo)
      if (isDirectOrder) {
        const res = await dispatch(
          postSingleOrder({
            productId: productId!,
            quantity: parseInt(quantity!),
            totalAmount,
            shippingInfo,
          })
        ).unwrap();
        router.push(`/account/order_success?orderId=${res.order._id}`);
        toast.success("Order placed successfully!");
      } else {
        const res = await dispatch(
          postCartOrders({
            totalAmount,
            shippingInfo,
          })
        ).unwrap();
        dispatch(clearCart());
        router.push(`/account/order_success?orderId=${res.order._id}`);
        toast.success("Cart order placed successfully!");
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  const placeSSLPayment = async () =>{
    try{
      console.log('the big lol')
    }catch(error){
      toast.error('SSL payment failed to start')
    }
  }

  const handlePlaceOrder = () => {
    if (!validateShipping()) return;

    if(paymentMethod === "COD"){
      placeCOD();
    }else{
      placeSSLPayment();
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.heading}>Checkout</h1>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className={style.tableCell}>Image</th>
              <th className={style.tableCell}>Name</th>
              <th className={style.tableCell}>Qty</th>
              <th className={style.tableCell}>Rate</th>
              <th className={style.tableCell}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.productId} className="text-sm">
                <td className={`${style.tableCell} w-[60px]`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded object-cover"
                  />
                </td>
                <td className={style.tableCell}>{item.name}</td>
                <td className={style.tableCell}>{item.quantity}</td>
                <td className={style.tableCell}>${item.price}</td>
                <td className={style.tableCell}>
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.totalAmount}>
        Total Price: <span className={style.totalPrice}>${totalAmount}</span>
      </div>

      <div className={style.formSection}>
        <h2 className={style.formTitle}>Shipping Address</h2>
        <div className={style.formGrid}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shippingInfo.fullName}
            onChange={handleShippingInfo}
            className={style.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={shippingInfo.phone}
            onChange={handleShippingInfo}
            className={style.input}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingInfo}
            className={style.input}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingInfo}
            className={style.input}
          />
          <input
            type="number"
            name="postCode"
            placeholder="Post Code"
            value={shippingInfo.postCode}
            onChange={handleShippingInfo}
            className={style.input}
          />
        </div>
      </div>

      <div className={style.paymentSection}>
        <h2 className={style.formTitle}>Payment Method</h2>

        <div className={style.paymentOptions}>
          <label className={style.paymentOption}>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <span>Cash on Delivery</span>
          </label>

          <label className={style.paymentOption}>
            <input
              type="radio"
              value="SSL"
              checked={paymentMethod === "SSL"}
              onChange={() => setPaymentMethod("SSL")}
            />
            <span>SSLCOMMERZ</span>
          </label>
        </div>
      </div>

      <div className="text-center">
        <button onClick={handlePlaceOrder} className={style.submitButton}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
