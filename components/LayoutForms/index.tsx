"use client";
import React from "react";
import GeneralForm from "../GeneralForm";

interface LayoutFormProps {
  openForm: null | "login" | "signup";
  setOpenForm: React.Dispatch<React.SetStateAction<null | 'login' | 'signup'>>;
}

const LayoutForms: React.FC<LayoutFormProps> = ({ openForm, setOpenForm }) => {
  if (!openForm) return null;
  return (
    <>
      {openForm === "signup" && (
        <GeneralForm
          title="Create your account."
          fields={[
            {
              name: "name",
              type: "name",
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
          onsubmit={(data) => {
            console.log(data);
          }}
          onclose={() => setOpenForm(null)}
          footerText={
            <p>
              Already have an account? <a href="">Log in</a>
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
          onsubmit={(data) => {
            console.log(data);
          }}
          onclose={() => setOpenForm(null)}
          footerText={<a href="">Forgot your password? </a>}
          submitText="Log in"
        />
      )}
    </>
  );
};

export default LayoutForms;
