"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="bg-mainBg1 flex justify-between p-3">
      <p className="flex gap-2">
        © {year}
        <a
          href="https://www.linkedin.com/in/mhasan95/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Mahmudul Hasan
        </a>
      </p>
      {user?.isAdmin && <Link href="/admin">Admin dashboard</Link>}
    </div>
  );
};

export default Footer;
