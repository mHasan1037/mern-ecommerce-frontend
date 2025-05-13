"use client";
import { useAppDispatch } from "@/redux/hooks";
import { changePassword } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
        router.push('/');
      })
      .catch((err: any) => {
        console.log("Some error occure", err);
      });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-md shadow-sm p-6 space-y-5"
      >
        <div>
          <label
            htmlFor="password"
            className="block text-sm text-gray-600 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="block text-sm text-gray-600 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
