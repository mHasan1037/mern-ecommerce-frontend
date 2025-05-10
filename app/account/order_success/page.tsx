import React, { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccess";
import LoadingScreen from "@/components/LoadingScreen";

const OrderSuccessPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <OrderSuccessClient />
    </Suspense>
  );
};

export default OrderSuccessPage;