import React from "react";

interface paymentStatusProps {
    headline: string;
    message: string;
    buttonText: string;
    buttonLink: string;
}

const PaymentStatus = ({headline, message, buttonText, buttonLink}: paymentStatusProps) => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">{headline}</h1>
      <p className="mt-3">
        {message}
      </p>
      <a href={buttonLink} className="text-blue-500 underline mt-5 block">
        {buttonText}
      </a>
    </div>
  );
};

export default PaymentStatus;
