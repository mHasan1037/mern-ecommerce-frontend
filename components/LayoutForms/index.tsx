"use client";
import React from "react";
import GeneralForm from "../GeneralForm";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/authSlice";

interface LayoutFormProps {
  openForm: null | "login" | "signup" | "verifyEmail" | "resetPasswordLink";
  setOpenForm: React.Dispatch<
    React.SetStateAction<
      null | "login" | "signup" | "verifyEmail" | "resetPasswordLink"
    >
  >;
}

const LayoutForms: React.FC<LayoutFormProps> = ({ openForm, setOpenForm }) => {
  const dispatch = useDispatch();
  
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
              setOpenForm("verifyEmail");
            } catch (err: any) {
              const errorData = err.response?.data;
              if (errorData?.status === "failed" && errorData?.message) {
                toast.error(errorData.message);
              } else {
                toast.error("Something went wrong.");
              }
            }
          }}
          onclose={() => setOpenForm(null)}
          footerText={
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setOpenForm("login")}
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
              setOpenForm(null);
            } catch (err: any) {
              console.log(err);
              toast.error("Incorrect email or password");
            }
          }}
          onclose={() => setOpenForm(null)}
          footerText={
            <span
              className="cursor-pointer hover:text-mainBg2"
              onClick={() => setOpenForm("resetPasswordLink")}
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
              setOpenForm("login");
            } catch (err: any) {
              console.log(err);
              toast.error("Invalid email or verification number");
            }
          }}
          onclose={() => setOpenForm(null)}
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
            console.log('data', data)
            try {
              const res = await axiosInstance.post(
                "/api/user/reset-password-link",
                data
              );
              toast.success("Check your email");
              setOpenForm(null);
            } catch (err: any) {
              console.log(err);
              toast.error("Invalid email");
            }
          }}
          onclose={() => setOpenForm(null)}
          submitText="Submit"
        />
      )}
    </>
  );
};

export default LayoutForms;
