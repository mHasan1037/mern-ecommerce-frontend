"use client"
import LoadingScreen from '@/components/LoadingScreen';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loadUser } from '@/redux/slices/authSlice';
import React, { useEffect } from 'react'

const Profile = () => {
  const dispatch = useAppDispatch();
  const {user, loading} = useAppSelector((state) => state.auth);

  useEffect(()=>{
     dispatch(loadUser())
  }, [dispatch])

  if(loading){
    return <LoadingScreen />
  }

  return (
    <div>
      <h1>User name: {user?.name}</h1>
      <h1>Email: {user?.email}</h1>
      {user?.isVerified && <h2>Verified: Yes</h2>}
      {user?.isAdmin && <h2>Role: Admin</h2>}
      {user?.totalSpent && <h2>Total amount ordered: {user.totalSpent}</h2>}
      {user?.totalDeliveredOrders != null && (
        <h2>Total Delivered orders: {user.totalDeliveredOrders}</h2>
      )}
      {user?.recentOrder && <h2>Recent order: {user?.recentOrder.orderItems[0]?.name}</h2>}
      {user?.totalCancelledOrders != null && (
        <h2>Total Cancel orders: {user.totalCancelledOrders}</h2>
      )}
    </div>
  )
}

export default Profile