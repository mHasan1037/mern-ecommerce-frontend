import React, { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccess";

const OrderSuccessPage = () => {
  return (
    <Suspense fallback={<p>Loading order details...</p>}>
      <OrderSuccessClient />
    </Suspense>
  );
};

export default OrderSuccessPage;