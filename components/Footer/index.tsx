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
    <div className={"flex justify-between border-t border-mist bg-ink px-4 py-6 font-body text-sm text-pearl/75 sm:px-8"}>
      <p className="flex gap-2">
        © {year}
        <a
          href="https://www.linkedin.com/in/mhasan95/"
          target="_blank"
          rel="noopener noreferrer"
          className={"text-brass transition hover:text-pearl"}
        >
          Mahmudul Hasan
        </a>
      </p>
      {user?.isAdmin && <Link className={"transition hover:text-brass"} href="/admin">Admin dashboard</Link>}
    </div>
  );
};

export default Footer;
