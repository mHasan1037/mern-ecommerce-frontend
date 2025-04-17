"use client"
import React from 'react';
import style from './Footer.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

const Footer = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    console.log('user', user)
  return (
    <div className='bg-mainBg1 flex justify-between p-3'>
        <p>Copyright: 2025</p>
        {user?.isAdmin && <Link href="/admin">Admin dashboard</Link>}       
    </div>
  )
}

export default Footer