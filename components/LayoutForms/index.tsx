"use client";
import React from "react";
import GeneralForm from "../GeneralForm";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { closeAuthForm, openAuthForm } from "@/redux/slices/uiSlice";

interface LayoutFormProps {
  openForm: null | "login" | "signup" | "verifyEmail" | "resetPasswordLink";
}

const LayoutForms: React.FC<LayoutFormProps> = ({ openForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  if (!openForm) return null;
  return (
    <>
      {openForm === "signup" && (
        <GeneralForm
          title="Create your account."
          fields={[
            {
              name: "name",
              type: "text",
              label: "Name",
              placeholder: "Your name",
              required: true,
            },
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "you@example.com",
              required: true,
            },
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
            },
          ]}
          onsubmit={async (data) => {
            try {
              await axiosInstance.post("/api/user/register", data);
              toast.success("Account created successfully.");
              dispatch(openAuthForm({ form: "verifyEmail" }));
            } catch (err: any) {
              const errorData = err.response?.data;
              if (errorData?.status === "failed" && errorData?.message) {
                toast.error(errorData.message);
              } else {
                toast.error("Something went wrong.");
              }
            }
          }}
          onclose={() => dispatch(closeAuthForm())}
          footerText={
            <p>
              Already have an account?{" "}
              <span
                onClick={() => dispatch(openAuthForm({ form: "login" }))}
                className="cursor-pointer text-mainBg2 font-bold"
              >
                Log in
              </span>
            </p>
          }
          submitText="Sign up"
        />
      )}
      {openForm === "login" && (
        <GeneralForm
          title="Log in to your account."
          fields={[
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "you@example.com",
              required: true,
            },
            {
              name: "password",
              type: "password",
              label: "Password",
              placeholder: "Password",
              required: true,
            },
          ]}
          onsubmit={async (data) => {
            try {
              const res = await axiosInstance.post("/api/user/login", data);
              const {user, access_token, refresh_token, is_auth} = res.data;

              dispatch(loginSuccess({
                user,
                accessToken: access_token,
                refreshToken: refresh_token,
                isAuthenticated: is_auth,
                adminViewedUser: null
              }));
              
              toast.success("Login successfull");
              dispatch(closeAuthForm());
            } catch (err: any) {
              console.log(err);
              toast.error("Incorrect email or password");
            }
          }}
          onclose={() => dispatch(closeAuthForm())}
          footerText={
            <span
              className="cursor-pointer hover:text-mainBg2"
              onClick={() => dispatch(openAuthForm({ form: "resetPasswordLink" }))}
            >
              Forgot your password?{" "}
            </span>
          }
          submitText="Log in"
        />
      )}
      {openForm === "verifyEmail" && (
        <GeneralForm
          title="Verify your email address."
          fields={[
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "you@example.com",
              required: true,
            },
            {
              name: "otp",
              type: "text",
              label: "OTP",
              placeholder: "OTP",
              required: true,
            },
          ]}
          onsubmit={async (data) => {
            try {
              const res = await axiosInstance.post(
                "/api/user/verify-email",
                data
              );
              toast.success("Email successfully verified");
              dispatch(openAuthForm({ form: "login" }));
            } catch (err: any) {
              console.log(err);
              toast.error("Invalid email or verification number");
            }
          }}
          onclose={() => dispatch(closeAuthForm())}
          footerText={<a href="">Resent OTP </a>}
          submitText="Submit"
        />
      )}
      {openForm === "resetPasswordLink" && (
        <GeneralForm
          title="Send an email to reset your password"
          fields={[
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "you@example.com",
              required: true,
            }
          ]}
          onsubmit={async (data) => {
            try {
              const res = await axiosInstance.post(
                "/api/user/reset-password-link",
                data
              );
              toast.success("Check your email");
              dispatch(closeAuthForm());
            } catch (err: any) {
              console.log(err);
              toast.error("Invalid email");
            }
          }}
          onclose={() => dispatch(closeAuthForm())}
          submitText="Submit"
        />
      )}
    </>
  );
};

export default LayoutForms;
