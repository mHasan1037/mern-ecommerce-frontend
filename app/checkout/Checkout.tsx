"use client";
import { useAppDispatch } from "@/redux/hooks";
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
  const [shippingInfo, setShippingInfo] =
    useState<shippingInfo>(initialShippingInfo);
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
      country: "Bangladesh",
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.postCode ||
      !shippingInfo.phone
    ) {
      toast.error("Please fill in all shipping fields.");
      return;
    }
    if (isDirectOrder) {
      dispatch(
        postSingleOrder({
          productId: productId as string,
          quantity: parseInt(quantity as string),
          totalAmount,
          shippingInfo,
        })
      )
        .unwrap()
        .then((res) => {
          router.push(`/account/order_success?orderId=${res.order._id}`);
          toast.success("Order placed successfully!");
        })
        .catch((err) => {
          toast.error("Failed to place order: ", err);
        });
    } else {
      dispatch(
        postCartOrders({
          totalAmount,
          shippingInfo,
        })
      )
        .unwrap()
        .then((res) => {
          router.push(`/account/order_success?orderId=${res.order._id}`);
          dispatch(clearCart());
          toast.success("Cart order placed successfully!");
        })
        .catch((err) => {
          toast.error("Failed to place cart order: " + err);
        });
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

      <div className="text-center">
        <button onClick={handlePlaceOrder} className={style.submitButton}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
