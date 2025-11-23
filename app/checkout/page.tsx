"use client"
import React, { Suspense } from "react";
import Checkout from "./Checkout";
import LoadingScreen from "@/components/LoadingScreen";

const CheckoutPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Checkout />
    </Suspense>
  );
};

export default CheckoutPage;
