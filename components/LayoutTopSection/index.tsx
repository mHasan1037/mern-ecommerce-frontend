"use client"
import React, { useState } from "react";
import LayoutForms from "../LayoutForms";
import MainNavbar from "../MainNavbar";

const LayoutTopSection = () => {
  const [openForm, setOpenForm] = useState<null | "login" | "signup">(null);
  return (
    <div>
      <LayoutForms openForm={openForm} setOpenForm={setOpenForm}/>
      <MainNavbar setOpenForm={setOpenForm} />
    </div>
  );
};

export default LayoutTopSection;
