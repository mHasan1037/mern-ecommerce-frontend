"use client";
import { useAppDispatch } from "@/redux/hooks";
import { changePassword } from "@/redux/slices/authSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface formDataInput {
  password: string;
  password_confirmation: string;
}

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<formDataInput>({
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error("Password and confirm password didn't match");
      return;
    }
    dispatch(changePassword(formData))
      .then(() => {
        setFormData({
          password: "",
          password_confirmation: "",
        });
        toast.success("Password has been updated!");
      })
      .catch((err: any) => {
        console.log("Some error occure", err);
      });
  };

  return (
    <div>
      <h1>ChangePassword</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <span>New Password:</span>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <span>Confirm Password:</span>
          <input
            type="text"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;
