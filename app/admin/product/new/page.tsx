"use client"

import AdminSidebar from "@/components/adminSidebar";
import ConfirmButton from "@/components/buttons/ConfirmButton";
import React, { useState } from "react";

const NewProduct = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('formdata', formData)
    }

  return (
    <div className="adminMainSection">
      <AdminSidebar />
      <form onSubmit={handleSubmit}>
        <div>
          <p>Title:</p>
          <input type="text" name="name" onChange={handleChange}/>
        </div>
        <div>
          <p>Description:</p>
          <textarea name="description" onChange={handleChange}></textarea>
        </div>
        <div>
            <p>Price</p>
            <input type="number" name="price" onChange={handleChange}/>
        </div>
        <div>
            <p>Categroy</p>
            <input type="text" name="category" onChange={handleChange}/>
        </div>
        <div>
            <p>Stock</p>
            <input type="number" name="stock" onChange={handleChange}/>
        </div>
        <div>
            <p>Image</p>
            <input type="file" />
        </div>
        <ConfirmButton buttonText="Upload" type="submit" />
      </form>
    </div>
  );
};

export default NewProduct;
