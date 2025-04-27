"use client"
import GeneralForm from '@/components/GeneralForm';
import axiosInstance from '@/utils/axiosInstance';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { userId, token } = useParams();
    const router = useRouter();

  return (
    <div>
        <GeneralForm
          title="Reset your password"
          fields={[
            {
              name: "password",
              type: "password",
              label: "Password",
              placeholder: "Password",
              required: true,
            },
            {
                name: "password_confirmation",
                type: "password",
                label: "Password Confirmation",
                placeholder: "Confirm your password",
                required: true,
            }
          ]}
          onsubmit={async (data) => {
            try {
              await axiosInstance.post(
                `api/user/reset-password/${userId}/${token}`,
                data
              );
              toast.success("Password is reset successfully. Log in again.");
              router.push("/");
            } catch (err: any) {
                console.log('the error', err)
              const errorData = err.response?.data;
              if (errorData?.status === "failed" && errorData?.message) {
                toast.error(errorData.message);
              } else {
                toast.error("Something went wrong.");
              }
            }
          }}
          onclose={()=> router.push("/")}
          submitText="Submit"
        /> 
    </div>
  )
}

export default ResetPassword