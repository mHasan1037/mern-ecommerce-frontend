"use client"
import React, { Suspense } from "react";
import Checkout from "./Checkout";
import LoadingScreen from "@/components/LoadingScreen";
import PaymentStatus from "./PaymentStatus";
import { useSearchParams } from "next/navigation";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  if (paymentStatus === "failed") {
    return (
      <PaymentStatus
        headline={"Payment Failed"}
        message={"Your payment could not be processed. Please try again."}
        buttonText={"Back to Checkout"}
        buttonLink={"/checkout"}
      />
    );
  }

  if (paymentStatus === "cancelled") {
    return (
      <PaymentStatus
        headline={"Payment Cancelled"}
        message={"You cancelled the payment. No order was placed."}
        buttonText={"Try again"}
        buttonLink={"/checkout"}
      />
    );
  }

  if (paymentStatus === "error") {
    return (
      <PaymentStatus
        headline={"Payment Error"}
        message={"An unexpected error occurred. Please try again."}
        buttonText={"Back to Checkout"}
        buttonLink={"/checkout"}
      />
    );
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Checkout />
    </Suspense>
  );
};

export default CheckoutPage;
