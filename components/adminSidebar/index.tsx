import React from 'react';
import styles from './adminSidebar.module.css';
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <div className={styles.sidebarMain}>
        <ul>
            <li className='text-mainBg2 cursor-pointer flex flex-col gap-3'>
                <Link href="/admin">Dashboard</Link>
                <Link href="/admin/product">Product</Link>
                <Link href="/admin/category">Categories</Link>
                <Link href="/admin/orders">Orders</Link>
            </li>
        </ul>
    </div>
  )
}

export default AdminSidebar