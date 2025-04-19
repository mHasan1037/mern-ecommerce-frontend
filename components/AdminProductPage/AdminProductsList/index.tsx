"use client"
import React, { useState, useEffect } from 'react';
import style from './adminProductList.module.css';
import axiosInstance from '@/utils/axiosInstance';
import { ProductType } from '@/types/product';

interface ProductResponse {
  total: number,
  page: number,
  pages: number,
  products: ProductType[]
}

const AdminProductsList = () => {
  const [allProductInfo, setAllProductsInfo] = useState<ProductResponse | null>(null);

  useEffect(()=>{
     const getAllProducts = async () =>{
        try{
          const allProducts = await axiosInstance.get('/api/products');
          setAllProductsInfo(allProducts.data)
          console.log('product', allProducts.data.products)
          console.log('product', allProducts.data)
        }catch(error){
          console.error('Error fetching products', error)
        }
     }
     getAllProducts();
  }, []);

  return (
    <div>
      <h1>All products</h1>
      <div>
        {!allProductInfo ? (
          <p>Loading...</p>
        ) : (
              <table>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Stock status</th>
                  <th>Price</th>
                  <th>Ratings</th>
                  <th>Action</th>
                </tr>
                {
                  allProductInfo.products.map((product) =>{
                    return (
                      <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category?.name}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>{product.ratings?.average}</td>
                    </tr>
                    )
                  })
                }
              </table>          
        )}
      </div>
    </div>
  )
}

export default AdminProductsList