import React from 'react'
import StoreProductsCard from './store-products-card'
import { GET_STORE_PRODUCTS } from '../config'
import { useState, useEffect } from 'react'

export default function StoreProducts({ storeId }) {
  console.log(storeId)
  const [products, setProducts] = useState([])
  const getStoreProducts = async () => {
    const response = await fetch(`${GET_STORE_PRODUCTS}/${storeId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const result = await response.json()
    console.log(result)
    setProducts(result)
  }

  useEffect(() => {
    getStoreProducts()
  }, [])

  return (
    <div className={`container`}>
      <div className="row gy-3">
        {products.map((product) => (
          <div className={`col-12 col-sm-6 col-xl-4`} key={product.id}>
            <StoreProductsCard storeId={storeId} product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
