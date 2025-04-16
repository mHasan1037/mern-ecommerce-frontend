"use client";
import AdminSidebar from '@/components/adminSidebar';
import { RootState } from '@/redux/store';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Admin = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
       if(user || isAuthenticated){
         if(!isAuthenticated || !user?.isAdmin){
            router.replace('/');
         }else{
            setIsLoading(false);
         }
       }
    }, [user, isAuthenticated, router]);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const res = await axiosInstance.get("/api/admin/allUsersOrders?page=1&limit=10");
            console.log("Admin orders:", res.data);
          } catch (err: any) {
            console.error("Error fetching admin orders:", err?.response?.data || err.message);
          }
        };
      
        fetchOrders();
    }, []);

    if(isLoading){
        return <h1>Loading page</h1>
    }

  return (
    <div className='flex'>
        <AdminSidebar />
        <h1>Admin</h1>
    </div>
  )
}

export default Admin


// dashboard
//  - total order
//  - total customer
//  - total products
//  - total revenue
//  - Earning reports (weekly, monthly, yearly)
//  - Sales report graph
//  - Most popular product table
//  https://mannatthemes.com/robotech/default/index.html#


// product, category, order, customer, inventory
// https://techzaa.in/venton/product-list.html


//setting