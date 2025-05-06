"use client"
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loadUser } from '@/redux/slices/authSlice';
import React, { useEffect } from 'react'

const UserProfile = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);
  
    useEffect(()=>{
       dispatch(loadUser())
    }, [dispatch])
    
    return (
      <div>
        <h1>User name: {user?.name}</h1>
        <h1>Email: {user?.email}</h1>
        {user?.isVerified && <h2>Verified: Yes</h2>}
        {user?.isAdmin && <h2>Role: Admin</h2>}
        {user?.totalSpent && <h2>Total amount ordered: {user.totalSpent}</h2>}
        {user?.totalDelivedOrder && <h2>Total orders: {user.totalDelivedOrder}</h2>}
        {user?.recentOrder && <h2>Recent order: {user?.recentOrder.orderItems[0]?.name}</h2>}
        {user?.totalDelivedOrder && <h2>Total orders: {user.totalDelivedOrder}</h2>}
        {user?.totalCancelledOrders && <h2>Total orders: {user.totalCancelledOrders}</h2>}
      </div>
    )
}

export default UserProfile