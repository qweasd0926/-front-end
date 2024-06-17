import React, { useState, useEffect } from 'react'
import { PRODUCTS_GET_API } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'

export default function Checkout() {
  const router = useRouter()

  // 取得商品資料表

  // -----------

  const [formData, setFormData] = useState({ product_id: '' })

  const formSubmit = async (e) => {
    e.preventDefault()

    const r = await fetch(PRODUCTS_GET_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await r.json()
    console.log(result)
    if (result.success) {
      alert('資料新增成功')
      router.push('/address-book')
    } else {
      alert('資料沒有新增')
    }
  }

  /*
  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
    console.log(formData)
  }
  */
  console.log(formData)
  return (
    <>
      {/* Checkout Start */}
      <form name="form1" onSubmit={formSubmit}>
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-4">
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom">
                  <h6 className="mb-3">Products</h6>
                  <div className="col-md-6 form-group">
                    <label htmlFor="product_id">姓名</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="取件姓名"
                      name="product_id"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          product_id: e.target.value,
                        })
                      }
                      value={formData.product_id}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <h5 className="section-title position-relative text-uppercase mb-3">
                  <span className="bg-secondary pr-3">Payment</span>
                </h5>
                <div className="bg-light p-30">
                  <button
                    className="btn btn-block btn-primary font-weight-bold py-3"
                    type="button"
                    onClick={formSubmit}
                  >
                    送出訂單
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Checkout End */}
    </>
  )
}
