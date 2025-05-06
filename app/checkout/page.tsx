import React, { Suspense } from "react";
import Checkout from "./Checkout";

const CheckoutPage = () => {
  return (
    <Suspense fallback={<p>Loading checkout...</p>}>
      <Checkout />
    </Suspense>
  );
};

export default CheckoutPage;